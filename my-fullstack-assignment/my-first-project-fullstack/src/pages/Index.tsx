import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchProducts,
  fetchProductDetail,
  addProduct,
  editProduct,
  removeProduct,
  clearError,
  clearSelectedProduct,
} from "../store/slices/product.slice";
import { ProductFormData } from "../services/product";
import ProductList from "../components/ProductList";
import ProductSearch from "../components/ProductSearch";
import ProductPagination from "../components/ProductPagination";
import ProductForm from "../components/ProductForm";
import ProductDetail from "../components/ProductDetail";
import ProductsHeader from "../components/ProductHeader";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";
import { toast } from "sonner";

// Define view states
type ViewState = "list" | "detail" | "create" | "edit";

const Index = () => {
  const [viewState, setViewState] = useState<ViewState>("list");
  const dispatch = useAppDispatch();
  const {
    filteredProducts,
    selectedProduct,
    isLoading,
    loadingProductId,
    isSubmitting,
    error,
    pagination,
  } = useAppSelector((state) => state.products);

  // Calculate paginated products
  const paginatedProducts = React.useMemo(() => {
    const { page, limit } = pagination;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, pagination]);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductDetail = (id: string) => {
    dispatch(fetchProductDetail(id))
      .unwrap()
      .then(() => setViewState("detail"))
      .catch(() => {}); // Error is already handled in the slice
  };

  const handleCreateProduct = async (data: ProductFormData) => {
    dispatch(addProduct(data))
      .unwrap()
      .then(() => {
        setViewState("list");
        toast.success("Product created successfully!");
      })
      .catch(() => {}); // Error is already handled in the slice
  };

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!selectedProduct) return;

    dispatch(editProduct({ id: selectedProduct.productId, data }))
      .unwrap()
      .then(() => {
        setViewState("detail");
        toast.success("Product updated successfully!");
      })
      .catch(() => {}); // Error is already handled in the slice
  };

  const handleDeleteProduct = async (id: string) => {
    dispatch(removeProduct(id))
      .unwrap()
      .then(() => {
        if (selectedProduct?.productId === id) {
          setViewState("list");
        }
        toast.success("Product deleted successfully!");
      })
      .catch(() => {}); // Error is already handled in the slice
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
                onClick={() => dispatch(clearError())}
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
            <ProductSearch />
            <ProductList
              products={paginatedProducts}
              isLoading={isLoading}
              onEdit={(product) => {
                dispatch(fetchProductDetail(product.productId));
                setViewState("edit");
              }}
              onDelete={handleDeleteProduct}
              onView={handleProductDetail}
            />
            <div className="mt-6">
              <ProductPagination />
            </div>
          </>
        );
      case "detail":
        return loadingProductId === selectedProduct?.productId ? (
          <ProductDetailSkeleton />
        ) : selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => {
              dispatch(clearSelectedProduct());
              setViewState("list");
            }}
            onEdit={() => {
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
