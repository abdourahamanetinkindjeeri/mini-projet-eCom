import { useState } from "react";
import { FAKE_DATA } from "../../data/data";
import ArticleCard from "./article/ArticleCard";
import ArticleList from "./article/ArticleList";

export default function ProductCard() {
  const [likes, setLikes] = useState({});

  function toggleLike(id) {
    setLikes(function (previousLikes) {
      const updatedLikes = { ...previousLikes };

      updatedLikes[id] = !previousLikes[id];

      return updatedLikes;
    });
  }

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
          {FAKE_DATA.map((produit) => (
            <ArticleCard
              key={produit.label}
              produit={{ ...produit, isLike: likes[produit.id] }}
              onToggleLike={toggleLike}
            />
          ))}
        </div>

        <div
          style={{
            color: "white",
            marginTop: "32px",
            // paddingLeft: "32px",
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
              value={0}
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
              value={999}
              style={{
                width: "60px",
                borderRadius: "4px",
                border: "none",
                padding: "4px",
              }}
            />
          </div>
          <div style={{ borderTop: "1px solid #444", marginTop: "8px" }}>
            {FAKE_DATA.map((produit) => (
              <ArticleList key={produit.label} produit={produit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
