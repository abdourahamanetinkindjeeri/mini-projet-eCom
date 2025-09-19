import ProductCard from "./ProductCard";
import { ShoppingCart } from "lucide-react";
import ProductList from "./ProductList";

export default function Product({
  products,
  addCart,
  removeCart,
  deleteCart,
  carts = [],
}) {
  return (
    <div className="flex flex-col gap-10 justify-center ">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center items-center gap-2">
          <ShoppingCart color="blue" size={30} />
          <h1 className="text-3xl font-bold">Shopping Cart Example</h1>
        </div>

        <p className="font-light">
          A partical example of React Context for state management
        </p>
      </div>

      <div className="flex flex-col justify-center gap-0.5">
        <h2 className="ml-48 font-bold text-3xl">Products</h2>

        <div className="flex gap-3 items-center justify-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addCart={addCart}
              disabled={product.stock <= 0}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="ml-48 font-bold text-3xl mt-1">Your cart</h2>

        <div className="flex flex-col items-center justify-center ml-47 mr-47 bg-white rounded-lg shadow-8xl">
          {carts.map((product) => (
            <ProductList
              product={product}
              key={product.id}
              onRemove={removeCart}
              onAdd={addCart}
              onDelete={deleteCart}
            />
          ))}
          <div className="text-3xl ml-150">
            Total :$
            {carts.reduce((acc, cart) => acc + cart.price * cart.qte, 0).toLocaleString("fr-FR") }
          </div>
        </div>
      </div>
    </div>
  );
}
