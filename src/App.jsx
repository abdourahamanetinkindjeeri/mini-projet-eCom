import "./App.css";
import Product from "./components/products/Product";
import useFetch from "../data/UseFetch";
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3001";

// export default function App() {
//   const { data: products, isLoading, error } = useFetch("products");
//   const { data: carts, loading, err } = useFetch("carts");

//   if (isLoading || loading) return <p>Chargement...</p>;
//   if (error || err) return <p>Erreur : {error?.message || err?.message}</p>;

//   const cartDetails = carts.map((cart) => {
//     const product = products.find((p) => p.id === cart.productId);
//     return {
//       ...cart,
//       name: product?.name || "Produit inconnu",
//       price: product?.price || 0,
//     };
//   });

//   // const apiCall = async (endpoint, method = "GET", data = null) => {
//   //   const response = await fetch(`${API_BASE}/${endpoint}`, {
//   //     method,
//   //     headers: { "Content-Type": "application/json" },
//   //     ...(data && { body: JSON.stringify(data) }),
//   //   });

//   //   if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
//   //   return response.json();
//   // };

const apiCall = async (endpoint, method = "GET", data = null) => {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (data && method !== "GET") {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_BASE}/${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Erreur API (${method} ${endpoint}): ${response.status}`);
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error("Erreur apiCall:", error);
    throw error;
  }
};

//   const handAddCart = async (id) => {
//     try {
//       const product = products.find((p) => p.id === id);
//       const cartItem = carts.find((cart) => cart.productId === id);

//       if (!product || product.stock <= 0) {
//         console.log("Produit indisponible ou stock insuffisant !");
//         return;
//       }

//       await apiCall(`products/${id}`, "PATCH", { stock: product.stock - 1 });

//       if (cartItem) {
//         await apiCall(`carts/${cartItem.id}`, "PATCH", {
//           qte: cartItem.qte + 1,
//         });
//       } else {
//         await apiCall("carts", "POST", {
//           id: Math.random().toString(36).substr(2, 4),
//           productId: id,
//           qte: 1,
//         });
//       }

//       // window.location.reload();
//     } catch (error) {
//       console.error("Erreur:", error);
//     }
//   };

//   const handRemoveCart = async (id) => {
//     try {
//       const product = products.find((p) => p.id === id);
//       const cartItem = carts.find((cart) => cart.productId === id);

//       if (!cartItem) {
//         console.log("Produit non trouvé dans le panier !");
//         return;
//       }

//       if (cartItem.qte > 1) {
//         await apiCall(`carts/${cartItem.id}`, "PATCH", {
//           qte: cartItem.qte - 1,
//         });
//       } else {
//         await apiCall(`carts/${cartItem.id}`, "DELETE");
//       }

//       if (product) {
//         await apiCall(`products/${id}`, "PATCH", { stock: product.stock + 1 });
//       }

//       // window.location.reload();
//     } catch (error) {
//       console.error("Erreur:", error);
//     }
//   };

//   const handDeleteCart = async (id) => {
//     try {
//       const product = products.find((p) => p.id === id);
//       const cartItem = carts.find((cart) => cart.productId === id);

//       if (!cartItem) {
//         console.log("Produit non trouvé dans le panier !");
//         return;
//       }

//       await apiCall(`carts/${cartItem.id}`, "DELETE");

//       if (product) {
//         await apiCall(`products/${id}`, "PATCH", {
//           stock: product.stock + cartItem.qte,
//         });
//       }

//       // window.location.reload();
//     } catch (error) {
//       console.error("Erreur:", error);
//     }
//   };

//   return (
//     <Product
//       products={products}
//       carts={cartDetails}
//       addCart={handAddCart}
//       removeCart={handRemoveCart}
//       deleteCart={handDeleteCart}
//     />
//   );
// }

export default function App() {
  const { data: productsData, isLoading, error } = useFetch("products");
  const { data: cartsData, loading, err } = useFetch("carts");

  const [stateProducts, setStateProducts] = useState([]);
  const [stateCarts, setStateCarts] = useState([]);

  // Synchroniser les données de l’API dans le state local
  useEffect(() => {
    if (productsData) setStateProducts(productsData);
  }, [productsData]);

  useEffect(() => {
    if (cartsData) setStateCarts(cartsData);
  }, [cartsData]);

  // ➕ Ajouter ou incrémenter un produit
  const handAddCart = async (id) => {
    try {
      const product = stateProducts.find((p) => p.id === id);
      const cartItem = stateCarts.find((cart) => cart.productId === id);

      if (!product || product.stock <= 0) {
        console.log("Produit indisponible ou stock insuffisant !");
        return;
      }

      // décrémente le stock côté API
      await apiCall(`products/${id}`, "PATCH", { stock: product.stock - 1 });

      // mets à jour le state local des produits
      setStateProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: p.stock - 1 } : p))
      );

      if (cartItem) {
        // mise à jour panier côté API
        const updatedCart = await apiCall(`carts/${cartItem.id}`, "PATCH", {
          qte: cartItem.qte + 1,
        });

        // mets à jour le state local
        setStateCarts((prev) =>
          prev.map((c) => (c.id === cartItem.id ? updatedCart : c))
        );
      } else {
        // ajout d’un nouveau produit au panier
        const newCart = await apiCall("carts", "POST", {
          id: Math.random().toString(36).substr(2, 4),
          productId: id,
          qte: 1,
        });

        setStateCarts((prev) => [...prev, newCart]);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // ➖ Retirer ou décrémenter un produit
  const handRemoveCart = async (id) => {
    try {
      const cartItem = stateCarts.find((cart) => cart.productId === id);
      if (!cartItem) return;

      if (cartItem.qte > 1) {
        const updatedCart = await apiCall(`carts/${cartItem.id}`, "PATCH", {
          qte: cartItem.qte - 1,
        });

        setStateCarts((prev) =>
          prev.map((c) => (c.id === cartItem.id ? updatedCart : c))
        );
      } else {
        await apiCall(`carts/${cartItem.id}`, "DELETE");
        setStateCarts((prev) => prev.filter((c) => c.id !== cartItem.id));
      }

      // réajoute 1 au stock produit
      await apiCall(`products/${id}`, "PATCH", {
        stock: stateProducts.find((p) => p.id === id).stock + 1,
      });

      setStateProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, stock: p.stock + 1 } : p))
      );
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // ❌ Supprimer complètement un produit du panier
  const handDeleteCart = async (id) => {
    try {
      const cartItem = stateCarts.find((cart) => cart.productId === id);
      if (!cartItem) return;

      await apiCall(`carts/${cartItem.id}`, "DELETE");

      setStateCarts((prev) => prev.filter((c) => c.id !== cartItem.id));

      // on remet le stock complet
      const product = stateProducts.find((p) => p.id === id);
      if (product) {
        await apiCall(`products/${id}`, "PATCH", {
          stock: product.stock + cartItem.qte,
        });

        setStateProducts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, stock: p.stock + cartItem.qte } : p
          )
        );
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  if (isLoading || loading) return <p>Chargement...</p>;
  if (error || err) return <p>Erreur : {error?.message || err?.message}</p>;

  // enrichir le panier avec infos produits
  const cartDetails = stateCarts.map((cart) => {
    const product = stateProducts.find((p) => p.id === cart.productId);
    return {
      ...cart,
      name: product?.name || "Produit inconnu",
      price: product?.price || 0,
    };
  });

  return (
    <>
      <Product
        products={stateProducts}
        carts={cartDetails}
        addCart={handAddCart}
        removeCart={handRemoveCart}
        deleteCart={handDeleteCart}
      />
    </>
  );
}
