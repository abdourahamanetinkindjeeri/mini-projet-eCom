import "./App.css";
import Product from "./components/products/Product";
import useFetch from "../data/UseFetch";
import { useState, useEffect } from "react";

export default function App() {
  const { data: products, isLoading, error } = useFetch("products");
  const { data: carts, loading, err } = useFetch("carts");
  
  // States locaux pour gérer les données en temps réel
  const [localProducts, setLocalProducts] = useState([]);
  const [localCarts, setLocalCarts] = useState([]);

  // Synchronisation des données au chargement
  useEffect(() => {
    if (products) {
      setLocalProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (carts) {
      setLocalCarts(carts);
    }
  }, [carts]);

  if (isLoading || loading) return <p>Chargement...</p>;
  if (error || err) return <p>Erreur : {error || err}</p>;

  // Protection contre les données nulles/undefined
  if (!localProducts.length && !localCarts.length && (!products || !carts)) {
    return <p>Données non disponibles</p>;
  }

  // Utilisation des données locales pour le calcul des détails du panier
  const cartDetails = localCarts.map((cart) => {
    const product = localProducts.find((p) => p.id === cart.productId);
    return {
      ...cart,
      name: product ? product.name : "Produit inconnu",
      price: product ? product.price : 0,
    };
  });

  const handAddCart = async (id) => {
    console.clear();
    console.log("ID reçu :", id);

    // Conversion de l'ID en nombre si c'est une string
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    
    const produit = localProducts.find((p) => p.id === numericId);
    if (!produit) {
      console.log("Produit introuvable");
      return;
    }

    // Vérifier le stock local
    if (produit.stock <= 0) {
      console.log("Stock épuisé");
      return;
    }

    // 1. Mise à jour LOCALE du stock (immédiate)
    const updatedProducts = localProducts.map(p => 
      p.id === numericId 
        ? { ...p, stock: p.stock - 1 }
        : p
    );
    setLocalProducts(updatedProducts);
    
    console.log(`✅ Stock local mis à jour pour ${produit.name} : ${produit.stock - 1}`);

    // 2. Mise à jour LOCALE du panier (immédiate)
    let productCart = localCarts.find((cart) => cart.productId === numericId);

    if (productCart) {
      // Produit déjà dans le panier, incrémenter la quantité
      const updatedCarts = localCarts.map(cart =>
        cart.productId === numericId
          ? { ...cart, qte: cart.qte + 1 }
          : cart
      );
      setLocalCarts(updatedCarts);
      console.log(`✅ Quantité locale mise à jour : ${productCart.qte + 1}`);
    } else {
      // Nouveau produit dans le panier
      const newCartItem = { id: Date.now(), productId: numericId, qte: 1 };
      setLocalCarts(prev => [...prev, newCartItem]);
      console.log("✅ Produit ajouté au panier local :", newCartItem);
    }

    // 3. Tentative de synchronisation avec le serveur (en arrière-plan)
    console.log("🔄 Tentative de synchronisation avec le serveur...");
    
    // Essayer de synchroniser le stock
    try {
      const response = await fetch(`http://localhost:8888/products/${produit.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: produit.stock - 1 }),
      });

      if (response.ok) {
        console.log("✅ Stock synchronisé avec le serveur");
      } else {
        console.warn("⚠️ Synchronisation stock échouée, mais données locales conservées");
      }
    } catch (err) {
      console.warn("⚠️ Erreur réseau pour le stock, mais données locales conservées");
    }

    // Essayer de synchroniser le panier
    if (productCart) {
      // Mise à jour d'un item existant
      try {
        const response = await fetch(`http://localhost:8888/carts/${productCart.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qte: productCart.qte + 1 }),
        });

        if (response.ok) {
          console.log("✅ Panier synchronisé avec le serveur");
        } else {
          console.warn("⚠️ Synchronisation panier échouée, mais données locales conservées");
        }
      } catch (err) {
        console.warn("⚠️ Erreur réseau pour le panier, mais données locales conservées");
      }
    } else {
      // Ajout d'un nouvel item
      try {
        const newCartItem = { id: Date.now(), productId: numericId, qte: 1 };
        const response = await fetch("http://localhost:8888/carts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCartItem),
        });

        if (response.ok) {
          console.log("✅ Nouvel item synchronisé avec le serveur");
        } else {
          console.warn("⚠️ Synchronisation nouvel item échouée, mais données locales conservées");
        }
      } catch (err) {
        console.warn("⚠️ Erreur réseau pour nouvel item, mais données locales conservées");
      }
    }

    console.log("🎉 Opération terminée - Interface mise à jour instantanément !");
  };

  return (
    <>
      <Product products={localProducts} carts={cartDetails} addCart={handAddCart} />
    </>
  );
}