import { FaHeart } from "react-icons/fa";
import Button from "../../utils/Button";

export default function ArticleCard({ produit, onToggleLike }) {
  console.log("Render:", produit.label);
  return (
    <div
      style={{
        backgroundColor: "#4b5563",
        borderRadius: "8px",
        padding: "16px",
        width: "250px",
        color: "white",
        position: "relative",
      }}
    >
      <FaHeart
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          color: produit.isLike ? "red" : "#d1d5db",
          cursor: "pointer",
        }}
        onClick={() => onToggleLike(produit.id)}
      />

      <h2
        style={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        {produit.label}
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        <img
          src={produit.image}
          alt={produit.label}
          style={{ width: "140px", borderRadius: "8px" }}
        />
      </div>

      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px" }}>Specification:</p>
        <Button label={produit.specification} />
      </div>

      <p
        style={{
          margin: "4px 0",
          textAlign: "center",
          fontSize: "14px",
          color: "limegreen",
        }}
      >
        {produit.stock} items available
      </p>

      <p
        style={{
          margin: "4px 0 12px",
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Price: ${produit.price}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <Button label="Buy" />
        <Button label="Buy 2" />
      </div> */}
      {produit.stock > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <p style={{ margin: 0, fontSize: "14px" }}>Specification:</p>
            <Button label={produit.specification} />
          </div>

          <p
            style={{
              margin: "4px 0",
              textAlign: "center",
              fontSize: "14px",
              color: "limegreen",
            }}
          >
            {produit.stock} items available
          </p>

          <p
            style={{
              margin: "4px 0 12px",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Price: ${produit.price}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <Button label="Buy" />
            <Button label="Buy 2" />
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <p style={{ margin: 0, fontSize: "14px" }}>Specification:</p>
            <Button label={produit.specification} />
          </div>
          <p
            style={{
              margin: "8px 0",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "bold",
              color: "red",
            }}
          >
            Not available
          </p>
        </>
      )}
    </div>
  );
}
