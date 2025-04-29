const API_URL = "http://localhost:3000/api";

// Type definitions
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  data?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description?: string;
  price: number;
  category: string;
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

// Mock data for development without backend
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Laptop",
    description: "High-performance laptop with latest processor",
    price: 1299.99,
    category: "Electronics",
    stock: 15,
    imageUrl: "https://placehold.co/400x300?text=Laptop",
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: "2",
    name: "Wireless Headphones",
    description:
      "Noise-cancelling wireless headphones with superior sound quality",
    price: 249.99,
    category: "Audio",
    stock: 30,
    imageUrl: "https://placehold.co/400x300?text=Headphones",
    createdAt: new Date(2023, 4, 20).toISOString(),
    updatedAt: new Date(2023, 4, 20).toISOString(),
  },
  {
    id: "3",
    name: "Smart Watch",
    description: "Fitness tracking watch with heart rate monitor",
    price: 199.99,
    category: "Wearables",
    stock: 25,
    imageUrl: "https://placehold.co/400x300?text=Watch",
    createdAt: new Date(2023, 3, 10).toISOString(),
    updatedAt: new Date(2023, 3, 10).toISOString(),
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    description: "Waterproof speaker with 20 hours battery life",
    price: 89.99,
    category: "Audio",
    stock: 45,
    imageUrl: "https://placehold.co/400x300?text=Speaker",
    createdAt: new Date(2023, 2, 5).toISOString(),
    updatedAt: new Date(2023, 2, 5).toISOString(),
  },
  {
    id: "5",
    name: "Ergonomic Keyboard",
    description: "Mechanical keyboard with customizable RGB lighting",
    price: 129.99,
    category: "Accessories",
    stock: 20,
    imageUrl: "https://placehold.co/400x300?text=Keyboard",
    createdAt: new Date(2023, 1, 15).toISOString(),
    updatedAt: new Date(2023, 1, 15).toISOString(),
  },
];

// Helper to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Check if we should use the mock data or try to connect to a real API
const useMock = false;

// API methods
export const getProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await delay(800);

  if (useMock) {
    return [...mockProducts];
  }

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

  if (useMock) {
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return { ...product };
  }

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

  if (useMock) {
    const newProduct: Product = {
      id: String(mockProducts.length + 1),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProducts.push(newProduct);
    return { ...newProduct };
  }

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
    if (!data.product) {
      throw new Error("Failed to create product");
    }
    return data.product;
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

  if (useMock) {
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }

    const updatedProduct: Product = {
      ...mockProducts[index],
      ...productData,
      updatedAt: new Date().toISOString(),
    };

    mockProducts[index] = updatedProduct;
    return { ...updatedProduct };
  }

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

    const data: ApiResponse<Product> = await response.json();
    if (!data.product) {
      throw new Error(`Failed to update product with ID ${id}`);
    }
    return data.product;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  // Simulate network delay
  await delay(500);

  if (useMock) {
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found`);
    }
    mockProducts.splice(index, 1);
    return;
  }

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
