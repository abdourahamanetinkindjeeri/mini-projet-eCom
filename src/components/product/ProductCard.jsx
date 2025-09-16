import { useState } from "react";
import { FAKE_DATA } from "../../data/data";
import ArticleCard from "./article/ArticleCard";
import ArticleList from "./article/ArticleList";

export default function ProductCard() {
  const [products, setProducts] = useState(FAKE_DATA);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);

  function toggleLike(id) {
    setProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === id ? { ...prod, isLike: !prod.isLike } : prod
      )
    );
  }

  const filteredProducts = products.filter(
    (prod) => prod.price >= minPrice && prod.price <= maxPrice
  );

  return (
    <div style={{ background: "#232733", minHeight: "100vh", width: "100%" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 0" }}>
        <h2
          style={{
            color: "white",
            marginBottom: "32px",
            paddingLeft: "32px",
            textAlign: "left",
          }}
        >
          Products
        </h2>
        <div
          style={{
            display: "flex",
            gap: "32px",
            justifyContent: "flex-start",
            marginBottom: "40px",
          }}
        >
          {products.map((produit) => (
            <ArticleCard
              key={produit.label}
              produit={produit}
              onToggleLike={toggleLike}
            />
          ))}
        </div>

        <div
          style={{
            color: "white",
            marginTop: "32px",
            maxWidth: "700px",
          }}
        >
          <h3 style={{ marginBottom: "16px", textAlign: "left" }}>
            Products filtered by price
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <span>Price: $</span>
            <input
              type="number"
              min={0}
              max={999}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              style={{
                width: "60px",
                borderRadius: "4px",
                border: "none",
                padding: "4px",
              }}
            />
            <span>- $</span>
            <input
              type="number"
              min={0}
              max={999}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{
                width: "60px",
                borderRadius: "4px",
                border: "none",
                padding: "4px",
              }}
            />
          </div>
          <div style={{ borderTop: "1px solid #444", marginTop: "8px" }}>
            <ArticleList produits={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
