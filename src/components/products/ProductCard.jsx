import React from "react";

export default function ProductCard({ product, addCart, disabled }) {
  return (
    <div className="bg-white rounded-lg shadow-8xl p-6 w-72 ">
      <h2 className="text-lg font-semibold mb-1 text-black">{product.name}</h2>
      <p className="text-gray-600 mb-4">${product.price}</p>
      <button
        onClick={() => addCart(product.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={disabled}
      >
        {disabled ? "Indisponible" : "Add to Cart"}
      </button>
    </div>
  );
}
