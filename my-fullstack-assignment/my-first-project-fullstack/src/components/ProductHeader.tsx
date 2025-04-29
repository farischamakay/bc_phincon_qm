import React from "react";

interface ProductsHeaderProps {
  onAddNew: () => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ onAddNew }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1>Product Management</h1>
      <button className="btn btn-primary" onClick={onAddNew}>
        Add New Product
      </button>
    </div>
  );
};

export default ProductsHeader;
