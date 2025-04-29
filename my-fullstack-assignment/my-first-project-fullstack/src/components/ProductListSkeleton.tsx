import React from "react";

const ProductListSkeleton: React.FC = () => {
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
          {[...Array(5)].map((_, i) => (
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
};

export default ProductListSkeleton;
