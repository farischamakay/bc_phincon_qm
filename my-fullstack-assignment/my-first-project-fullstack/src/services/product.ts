const API_URL = "http://localhost:3000/api";

// Type definitions
export interface Category {
  categoryId: string;
  title: string;
}
export interface Product {
  productId: string;
  name: string;
  price: number;
  categoryId: string;
  stock: number;
  imageUrl?: string;
  category?: Category;
  data?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  category?: Category;
  categoryId: string;
  stock: number;
  imageUrl?: string;
  data?: string | null;
}

// API Response type
interface ApiResponse<T> {
  status: string;
  message: string;
  products?: T[];
  product?: T;
}

// Helper to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API methods
export const getProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await delay(800);

  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: ApiResponse<Product> = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to load products. Please try again later.");
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  // Simulate network delay
  await delay(600);

  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Product with ID ${id} not found`);
      }
      throw new Error("Failed to fetch product details");
    }
    const data: ApiResponse<Product> = await response.json();
    if (!data.product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return data.product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (
  productData: ProductFormData
): Promise<Product> => {
  // Simulate network delay
  await delay(1000);

  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create product");
    }

    const data: ApiResponse<Product> = await response.json();
    console.log("Product created successfully:", data);

    return productData as Product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  productData: ProductFormData
): Promise<Product> => {
  // Simulate network delay
  await delay(800);

  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Product with ID ${id} not found`);
      }
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update product");
    }

    return productData as Product;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  // Simulate network delay
  await delay(500);

  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Product with ID ${id} not found`);
      }
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete product");
    }
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};
