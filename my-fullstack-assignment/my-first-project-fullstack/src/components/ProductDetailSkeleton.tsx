import React from "react";

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div
          className="skeleton"
          style={{ height: "32px", width: "120px" }}
        ></div>
        <div className="flex space-x-2">
          <div
            className="skeleton"
            style={{ height: "38px", width: "80px" }}
          ></div>
          <div
            className="skeleton"
            style={{ height: "38px", width: "80px" }}
          ></div>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="grid grid-cols-2 gap-6">
            <div
              className="skeleton"
              style={{ height: "300px", width: "100%" }}
            ></div>
            <div className="space-y-4">
              <div
                className="skeleton"
                style={{ height: "32px", width: "75%" }}
              ></div>
              <div className="space-y-2">
                <div
                  className="skeleton"
                  style={{ height: "24px", width: "100%" }}
                ></div>
                <div
                  className="skeleton"
                  style={{ height: "24px", width: "100%" }}
                ></div>
                <div
                  className="skeleton"
                  style={{ height: "24px", width: "100%" }}
                ></div>
                <div
                  className="skeleton"
                  style={{ height: "24px", width: "100%" }}
                ></div>
                <div
                  className="skeleton"
                  style={{ height: "24px", width: "100%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div
              className="skeleton"
              style={{ height: "24px", width: "120px", marginBottom: "8px" }}
            ></div>
            <div
              className="skeleton"
              style={{ height: "100px", width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
