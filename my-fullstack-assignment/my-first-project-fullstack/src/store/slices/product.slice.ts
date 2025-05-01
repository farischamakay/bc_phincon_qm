import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
  ProductFormData,
} from "../../services/product";

// Define filter and pagination types
export interface ProductFilters {
  search: string;
  category: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export interface SortConfig {
  key: keyof Product | null;
  direction: "ascending" | "descending";
}

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  loadingProductId: string | null;
  isSubmitting: boolean;
  error: string | null;
  filters: ProductFilters;
  pagination: PaginationState;
  sortConfig: SortConfig;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  isLoading: false,
  loadingProductId: null,
  isSubmitting: false,
  error: null,
  filters: {
    search: "",
    category: "all",
  },
  pagination: {
    page: 1,
    limit: 5,
    total: 0,
  },
  sortConfig: {
    key: "updatedAt",
    direction: "descending",
  },
};

// Helper function to apply filters, sorting, and pagination
const applyFiltersAndSort = (state: ProductsState) => {
  let result = [...state.products];

  // Apply search filter
  if (state.filters.search) {
    const searchTerm = state.filters.search.toLowerCase();
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Apply category filter
  if (state.filters.category && state.filters.category !== "all") {
    result = result.filter(
      (product) => product.category === state.filters.category
    );
  }

  // Apply sorting
  if (state.sortConfig.key) {
    result.sort((a, b) => {
      const key = state.sortConfig.key as keyof Product;

      if (a[key] < b[key]) {
        return state.sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return state.sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  // Update total count for pagination
  state.pagination.total = result.length;

  // Store filtered products for pagination
  state.filteredProducts = result;
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching products...");
      const data = await getProducts();
      console.log("Products data:", data);
      console.log("Products fetched:", data.length);
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue("Failed to load products. Please try again.");
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  "products/fetchProductDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const product = await getProduct(id);
      return product;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return rejectWithValue("Failed to load product details.");
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data: ProductFormData, { rejectWithValue }) => {
    try {
      const newProduct = await createProduct(data);
      return newProduct;
    } catch (error) {
      let errorMessage = "Failed to create product.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("Error creating product:", error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (
    { id, data }: { id: string; data: ProductFormData },
    { rejectWithValue }
  ) => {
    try {
      const updatedProduct = await updateProduct(id, data);
      return updatedProduct;
    } catch (error) {
      let errorMessage = "Failed to update product.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("Error updating product:", error);
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (error) {
      console.error("Error deleting product:", error);
      return rejectWithValue("Failed to delete product.");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    clearError(state) {
      state.error = null;
    },
    setSearchFilter(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
      state.pagination.page = 1; // Reset to first page on new search
      applyFiltersAndSort(state);
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.filters.category = action.payload;
      state.pagination.page = 1; // Reset to first page on new category
      applyFiltersAndSort(state);
    },
    setSortConfig(state, action: PayloadAction<SortConfig>) {
      state.sortConfig = action.payload;
      applyFiltersAndSort(state);
    },
    setPage(state, action: PayloadAction<number>) {
      state.pagination.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.pagination.limit = action.payload;
      state.pagination.page = 1; // Reset to first page when changing limit
      applyFiltersAndSort(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.products = action.payload;
          applyFiltersAndSort(state); // Apply filters and sort to the fetched products
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch Product Detail
      .addCase(fetchProductDetail.pending, (state, action) => {
        state.loadingProductId = action.meta.arg;
        state.error = null;
      })
      .addCase(
        fetchProductDetail.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loadingProductId = null;
          state.selectedProduct = action.payload;
        }
      )
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loadingProductId = null;
        state.error = action.payload as string;
      })

      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.isSubmitting = false;
          state.products = [action.payload, ...state.products];
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      })

      // Edit Product
      .addCase(editProduct.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(
        editProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.isSubmitting = false;
          state.selectedProduct = action.payload;
          state.products = state.products.map((p) =>
            p.id === action.payload.id ? action.payload : p
          );
        }
      )
      .addCase(editProduct.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      })

      // Remove Product
      .addCase(removeProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(
        removeProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
          // If currently selected product is deleted, clear it
          if (state.selectedProduct?.id === action.payload) {
            state.selectedProduct = null;
          }
        }
      )
      .addCase(removeProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  clearSelectedProduct,
  clearError,
  setSearchFilter,
  setCategoryFilter,
  setSortConfig,
  setPage,
  setLimit,
} = productsSlice.actions;

export default productsSlice.reducer;
