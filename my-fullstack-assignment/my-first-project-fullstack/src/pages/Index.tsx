import React, { useState, useEffect } from "react";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
  ProductFormData,
} from "../services/product";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import ProductDetail from "../components/ProductDetail";
import ProductsHeader from "../components/ProductHeader";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";

// Define view states
type ViewState = "list" | "detail" | "create" | "edit";

const Index = () => {
  const [viewState, setViewState] = useState<ViewState>("list");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Fetching products...");
      const data = await getProducts();
      console.log("Products fetched:", data.length);
      setProducts(data);
    } catch (error) {
      setError("Failed to load products. Please try again.");
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductDetail = async (id: string) => {
    setLoadingProductId(id);
    setError(null);
    try {
      const product = await getProduct(id);
      setSelectedProduct(product);
      setViewState("detail");
    } catch (error) {
      setError("Failed to load product details.");
      console.error("Error fetching product details:", error);
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleCreateProduct = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const newProduct = await createProduct(data);
      setProducts([newProduct, ...products]);
      setViewState("list");
      showNotification("Product created successfully!");
    } catch (error) {
      let errorMessage = "Failed to create product.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!selectedProduct) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const updatedProduct = await updateProduct(selectedProduct.id, data);
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setSelectedProduct(updatedProduct);
      setViewState("detail");
      showNotification("Product updated successfully!");
    } catch (error) {
      let errorMessage = "Failed to update product.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setError(errorMessage);
      console.error("Error updating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setError(null);
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      // If we're deleting the currently viewed product, go back to the list
      if (selectedProduct?.id === id) {
        setViewState("list");
      }
      showNotification("Product deleted successfully!");
    } catch (error) {
      setError("Failed to delete product.");
      console.error("Error deleting product:", error);
    }
  };

  // Simple notification function
  const showNotification = (message: string) => {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  const renderContent = () => {
    // Display error message if any
    if (error) {
      return (
        <div className="error-container p-4 mb-4">
          <div className="alert-dialog">
            <div className="alert-dialog-title">Error</div>
            <div className="alert-dialog-description">{error}</div>
            <div className="alert-dialog-footer">
              <button
                className="btn btn-primary"
                onClick={() => setError(null)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (viewState) {
      case "list":
        return (
          <>
            <ProductsHeader onAddNew={() => setViewState("create")} />
            <ProductList
              products={products}
              isLoading={isLoading}
              onEdit={(product) => {
                setSelectedProduct(product);
                setViewState("edit");
              }}
              onDelete={handleDeleteProduct}
              onView={(id) => fetchProductDetail(id)}
            />
          </>
        );
      case "detail":
        return loadingProductId === selectedProduct?.id ? (
          <ProductDetailSkeleton />
        ) : selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setViewState("list")}
            onEdit={(product) => {
              setSelectedProduct(product);
              setViewState("edit");
            }}
            onDelete={handleDeleteProduct}
          />
        ) : null;
      case "create":
        return (
          <ProductForm
            onSubmit={handleCreateProduct}
            onCancel={() => setViewState("list")}
            isSubmitting={isSubmitting}
          />
        );
      case "edit":
        return selectedProduct ? (
          <ProductForm
            initialData={selectedProduct}
            onSubmit={handleUpdateProduct}
            onCancel={() => setViewState("detail")}
            isSubmitting={isSubmitting}
          />
        ) : null;
    }
  };

  return <div className="container">{renderContent()}</div>;
};

export default Index;
