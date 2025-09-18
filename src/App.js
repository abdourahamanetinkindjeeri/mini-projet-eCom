import { useState } from "react";
import ProductList from "./components/ProductList";
import FilterPrice from "./components/FilterPrice";
import PRODUCTS from "./data/products";

function App() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);
  const [likedProducts, setLikedProducts] = useState([1, 3]);
  const [products, setProducts] = useState(PRODUCTS);

  const likeProducts = products.map((product) => ({
    ...product,
    liked: likedProducts.includes(product.id),
  }));

  const toggleLike = (id) => {
    setLikedProducts((prevLikedProducts) =>
      prevLikedProducts.includes(id)
        ? prevLikedProducts.filter((idProduct) => id !== idProduct)
        : [...prevLikedProducts, id]
    );
  };

  const handleChange = (field, value) => {
    const num = Number(value);
    if (field === "valueMin") setMinPrice(num);
    else setMaxPrice(num);
  };

  const handleStock = (id, qte) => {
    setProducts((prevProducts) =>
      prevProducts.map((produit) =>
        produit.id === id
          ? {
              ...produit,
              stock: Math.max(produit.stock - qte, 0),
              available: produit.stock - qte > 0,
            }
          : produit
      )
    );
  };

  const handleCountShow = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              views: product.views + 1,
            }
          : product
      )
    );

    console.log(products);
  };
  // const filtered = useMemo(
  //   () => PRODUCTS.filter(p => p.price >= minPrice && p.price <= maxPrice),
  //   [minPrice, maxPrice]
  // );
  // const filtered = useMemo(
  //   () => PRODUCTS.filter(p => p.price >= minPrice && p.price <= maxPrice),
  //   [minPrice, maxPrice]
  // );

  return (
    <div className="app-container">
      <main className="main">
        <div className="h1">Produit</div>

        <section className="cards-section">
          <ProductList
            products={likeProducts}
            onClick={toggleLike}
            onReduceStock={handleStock}
            countview={handleCountShow}
          />
        </section>

        <section className="filter-section">
          <h2 style={{ marginLeft: "75px" }}>Products filtered by price</h2>
          <FilterPrice
            range={{
              min: 0,
              max: 1000,
              valueMin: minPrice,
              valueMax: maxPrice,
            }}
            onChange={handleChange}
          />
          <div className="filtered-list">
            {products
              .filter((p) => p.price >= minPrice && p.price <= maxPrice)
              .map((p) => (
                <div key={p.id} className="filtered-item">
                  {p.name} cost ${p.price}
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
