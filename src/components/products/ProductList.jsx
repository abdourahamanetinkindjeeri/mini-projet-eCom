import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

export default function ProductList({ product, onRemove, onAdd, onDelete }) {
  return (
    <div className="w-full">
      <div className="flex w-full gap-6">
        <div className="flex-1 ml-2">
          <h3 className="font-light">{product.name}</h3>
          <p className="font-light text-gray-300">
            ${product.price * product.qte}
          </p>
        </div>

        <div className="flex-1 flex justify-end items-center gap-2">
          <button
            className="text-4xl"
            onClick={() => onRemove(product.productId)}
          >
            <Minus />
          </button>
          <p className="text-2xl">{product.qte}</p>
          <button className="text-4xl" onClick={() => onAdd(product.productId)}>
            <Plus />
          </button>
          <button
            className="text-4xl"
            onClick={() => onDelete(product.productId)}
          >
            <Trash2 color="red" />
          </button>
        </div>
      </div>

      <hr className="my-2 border-gray-100" />
    </div>
  );
}
