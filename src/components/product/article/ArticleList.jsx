export default function ArticleList({ produits }) {
  return (
    <div>
      {produits.map((produit) => (
        <div
          key={produit.id}
          className="produit-list"
          style={{
            padding: "8px 0",
            borderBottom: "1px solid #444",
            color: "white",
            fontSize: "16px",
            textAlign: "left",
            fontFamily: "inherit",
          }}
        >
          {produit.label} cost ${produit.price}
        </div>
      ))}
    </div>
  );
}
