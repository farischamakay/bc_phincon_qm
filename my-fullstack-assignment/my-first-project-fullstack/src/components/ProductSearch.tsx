import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setSearchFilter,
  setCategoryFilter,
} from "../store/slices/product.slice";

const ProductSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, filters } = useAppSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState(filters.search);
  const [categories] = useState<string[]>([]);

  // Extract unique categories from products
  useEffect(() => {
    if (products.length > 0) {
      // const uniqueCategories = Array.from(
      //   new Set(products.map((p) => p.category?.title))
      // );
      // setCategories(uniqueCategories.ascending());
    }
  }, [products]);

  // Debounce search to avoid excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchFilter(searchValue));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, dispatch]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Input
          placeholder="Search products..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-full md:w-48">
        <Select
          value={filters.category}
          onValueChange={(value: string) => dispatch(setCategoryFilter(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductSearch;
