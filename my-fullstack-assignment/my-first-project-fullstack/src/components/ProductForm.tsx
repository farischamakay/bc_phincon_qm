import React, { useState } from "react";
import { ProductFormData, Product } from "../services/product";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  category?: string;
  stock?: string;
  imageUrl?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    price: initialData?.price || 0,
    category: initialData?.category || "",
    stock: initialData?.stock || 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.stock < 0 || !Number.isInteger(formData.stock)) {
      newErrors.stock = "Stock must be a non-negative integer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        name: formData.name,
        price: formData.price,
        category: formData.category,
        stock: formData.stock,
      });
    }
  };

  return (
    <div>
      <button className="btn btn-outline mb-4" onClick={onCancel}>
        Back
      </button>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card-content space-y-4">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Product name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && (
                  <div className="error-message">{errors.price}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleChange}
                />
                {errors.stock && (
                  <div className="error-message">{errors.stock}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                name="category"
                type="text"
                placeholder="Product category"
                value={formData.category}
                onChange={handleChange}
              />
              {errors.category && (
                <div className="error-message">{errors.category}</div>
              )}
            </div>
          </div>
          <div className="card-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
