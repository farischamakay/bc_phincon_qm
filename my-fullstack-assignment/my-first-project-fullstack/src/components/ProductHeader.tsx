import React from "react";
import { ShoppingCart, LogOut, Plus } from "lucide-react";

interface ProductsHeaderProps {
  onAddNew: () => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ onAddNew }) => {
  return (
    <div className="flex items-center justify-between w-full mb-8 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
      </div>

      <div className="flex items-center">
        <button
          onClick={onAddNew}
          className="flex items-center gap-8 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 shadow hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
        <div className="mx-4 h-8 w-px bg-gray-200"></div> {/* Divider */}
        <div className="flex items-center gap-8">
          <button className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 group flex items-center">
            <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          <button className="flex items-center gap-8 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all duration-200 shadow hover:shadow-md">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
