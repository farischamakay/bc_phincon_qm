import React, { useState } from "react";
import { Product } from "../services/product";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
  onView,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "ascending" | "descending";
  } | null>(null);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const requestSort = (key: keyof Product) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortedProducts = () => {
    if (!sortConfig?.key || !sortConfig?.direction) return products;

    const { key, direction } = sortConfig;
    const isAscending = direction === "ascending" ? 1 : -1;

    return [...products].sort((a, b) => {
      const aVal = a[key] ?? "";
      const bVal = b[key] ?? "";
      return aVal > bVal ? isAscending : aVal < bVal ? -isAscending : 0;
    });
  };

  const getColumnSortIndicator = (key: keyof Product) => {
    if (sortConfig?.key !== key) {
      return null;
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  const handleDeleteClick = (id: string) => {
    setShowConfirm(id);
  };

  const handleConfirmDelete = (id: string) => {
    onDelete(id);
    setShowConfirm(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, i) => (
              <tr key={i}>
                <td>
                  <div
                    className="skeleton"
                    style={{ height: "20px", width: "120px" }}
                  ></div>
                </td>
                <td>
                  <div
                    className="skeleton"
                    style={{ height: "20px", width: "80px" }}
                  ></div>
                </td>
                <td>
                  <div
                    className="skeleton"
                    style={{ height: "20px", width: "100px" }}
                  ></div>
                </td>
                <td>
                  <div
                    className="skeleton"
                    style={{ height: "20px", width: "60px" }}
                  ></div>
                </td>
                <td>
                  <div
                    className="skeleton"
                    style={{ height: "20px", width: "100px" }}
                  ></div>
                </td>
                <td>
                  <div
                    className="skeleton"
                    style={{ height: "20px", width: "120px" }}
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="cursor-pointer" onClick={() => requestSort("name")}>
              Name {getColumnSortIndicator("name")}
            </th>
            <th className="cursor-pointer" onClick={() => requestSort("price")}>
              Price {getColumnSortIndicator("price")}
            </th>
            <th
              className="cursor-pointer"
              onClick={() => requestSort("category")}
            >
              Category {getColumnSortIndicator("category")}
            </th>
            <th className="cursor-pointer" onClick={() => requestSort("stock")}>
              Stock {getColumnSortIndicator("stock")}
            </th>
            <th
              className="cursor-pointer"
              onClick={() => requestSort("updatedAt")}
            >
              Last Updated {getColumnSortIndicator("updatedAt")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getSortedProducts().map((product) => (
            <tr key={product.id}>
              <td className="cursor-pointer" onClick={() => onView(product.id)}>
                {product.name}
              </td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.category}</td>
              <td>
                <span
                  className={`badge ${
                    product.stock > 20
                      ? "badge-green"
                      : product.stock > 5
                      ? "badge-yellow"
                      : "badge-red"
                  }`}
                >
                  {product.stock}
                </span>
              </td>
              <td>{formatDate(product.updatedAt)}</td>
              <td>
                <div className="flex space-x-2">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(product);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(product.id);
                    }}
                  >
                    Delete
                  </button>

                  {/* Confirmation Dialog */}
                  {showConfirm === product.id && (
                    <div
                      className="alert-dialog-backdrop"
                      onClick={() => setShowConfirm(null)}
                    >
                      <div
                        className="alert-dialog"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="alert-dialog-title">
                          Confirm deletion
                        </div>
                        <div className="alert-dialog-description">
                          Are you sure you want to delete "{product.name}"? This
                          action cannot be undone.
                        </div>
                        <div className="alert-dialog-footer">
                          <button
                            className="btn btn-outline"
                            onClick={() => setShowConfirm(null)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleConfirmDelete(product.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-6 text-muted">
                No products found. Add a new product to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
