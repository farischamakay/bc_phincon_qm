import React, { useState } from "react";
import { Product } from "../services/product";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onEdit,
  onDelete,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <button className="btn btn-outline" onClick={onBack}>
          Back to Products
        </button>
        <div className="flex space-x-2">
          <button className="btn btn-outline" onClick={() => onEdit(product)}>
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h1>{product.name}</h1>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price:</span>
                  <span className="text-lg font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Stock:</span>
                  <span
                    className={`badge ${
                      product.stock > 20
                        ? "badge-green"
                        : product.stock > 5
                        ? "badge-yellow"
                        : "badge-red"
                    }`}
                  >
                    {product.stock} units
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Created:</span>
                  <span>{product.createdAt}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Last Updated:</span>
                  <span>{product.updatedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="alert-dialog-backdrop">
          <div className="alert-dialog">
            <div className="alert-dialog-title">Confirm deletion</div>
            <div className="alert-dialog-description">
              Are you sure you want to delete "{product.name}"? This action
              cannot be undone.
            </div>
            <div className="alert-dialog-footer">
              <button
                className="btn btn-outline"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  onDelete(product.id);
                  setShowConfirm(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
