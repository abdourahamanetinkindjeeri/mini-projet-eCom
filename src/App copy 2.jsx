// import "./App.css";
// // import PRODUCTS from "../data/Products";
// import Product from "./components/products/Product";
// import useFetch from "../data/UseFetch";

// export default function App() {
//   const { data: products, isLoading, error } = useFetch("products");
//   const { data: carts, loading, err } = useFetch("carts");

//   if (isLoading || loading) return <p>Chargement...</p>;
//   if (error || err)
//     return (
//       <p>
//         Erreur : {error?.message || err?.message || "Une erreur est survenue"}
//       </p>
//     );
//   const cartDetails = carts.map((cart) => {
//     const product = products.find((p) => p.id === cart.productId);
//     return {
//       ...cart,
//       name: product ? product.name : "Produit inconnu",
//       price: product ? product.price : 0,
//     };
//   });

//   // const handAddCart = (id) => {
//   //   setStateCarts(prevStateCart =>
//   //     prevStateCart.includes(id)
//   //       ? prevStateCart.filter((cart) => cart.productId === id) {
//   //           [...cart, cart.qte + 1]
//   //       }

//   //   ): [...ca];
//   // };

//   const generateId = () => Math.random().toString(36).substr(2, 4);

//   const updateProductStock = async (productId, newStock) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/products/${productId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ stock: newStock }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Erreur lors de la mise à jour du stock");
//       }
//     } catch (error) {
//       console.error("Erreur réseau:", error);
//       throw error;
//     }
//   };

//   const addToCart = async (productId, qte = 1) => {
//     try {
//       const response = await fetch("http://localhost:3001/carts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           id: generateId(),
//           productId: productId,
//           qte: qte,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Erreur lors de l'ajout au panier");
//       }
//     } catch (error) {
//       console.error("Erreur réseau:", error);
//       throw error;
//     }
//   };

//   const updateCartQte = async (cartId, newQte) => {
//     try {
//       const response = await fetch(`http://localhost:3001/carts/${cartId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ qte: newQte }),
//       });

//       if (!response.ok) {
//         throw new Error("Erreur lors de la mise à jour du panier");
//       }
//     } catch (error) {
//       console.error("Erreur réseau:", error);
//       throw error;
//     }
//   };

//   const handAddCart = async (id) => {
//     console.clear();
//     console.log("ID reçu :", id);

//     try {
//       const productCart = carts.find((cart) => cart.productId === id);
//       const produit = products.find((product) => product.id === id);

//       // Vérifier si le produit existe et a du stock
//       if (!produit) {
//         console.error("Produit non trouvé");
//         return;
//       }

//       if (produit.stock <= 0) {
//         console.error("Stock insuffisant");
//         alert("Désolé, ce produit n'est plus en stock !");
//         return;
//       }

//       // Mettre à jour le stock du produit
//       await updateProductStock(id, produit.stock - 1);

//       // Mettre à jour ou créer l'item dans le panier
//       if (productCart) {
//         // Produit déjà dans le panier, augmenter la quantité
//         await updateCartQte(productCart.id, productCart.qte + 1);
//       } else {
//         // Nouveau produit dans le panier
//         await addToCart(id, 1);
//       }

//       console.log(
//         `Produit ajouté : ${produit.name} - ${produit.price}€ (stock restant: ${
//           produit.stock - 1
//         })`
//       );

//       // Recharger la page ou mettre à jour l'état pour refléter les changements
//       window.location.reload();
//     } catch (error) {
//       console.error("Erreur lors de l'ajout au panier:", error);
//       alert("Une erreur est survenue lors de l'ajout au panier");
//     }
//   };

//   return (
//     <>
//       <Product products={products} carts={cartDetails} addCart={handAddCart} />
//     </>
//   );
// }

import "./App.css";
import Product from "./components/products/Product";
import useFetch from "../data/UseFetch";

const API_BASE = "http://localhost:3001";

export default function App() {
  const { data: products, isLoading, error } = useFetch("products");
  const { data: carts, loading, err } = useFetch("carts");

  if (isLoading || loading) return <p>Chargement...</p>;
  if (error || err) return <p>Erreur : {error?.message || err?.message}</p>;

  const cartDetails = carts.map((cart) => {
    const product = products.find((p) => p.id === cart.productId);
    return {
      ...cart,
      name: product?.name || "Produit inconnu",
      price: product?.price || 0,
    };
  });

  const apiCall = async (endpoint, method = "GET", data = null) => {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      ...(data && { body: JSON.stringify(data) }),
    });

    if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
    return response.json();
  };

  const handAddCart = async (id) => {
    try {
      const product = products.find((p) => p.id === id);
      const cartItem = carts.find((cart) => cart.productId === id);

      if (!product || product.stock <= 0) {
        alert("Produit indisponible ou stock insuffisant !");
        return;
      }

      await apiCall(`products/${id}`, "PATCH", { stock: product.stock - 1 });

      if (cartItem) {
        await apiCall(`carts/${cartItem.id}`, "PATCH", { qte: cartItem.qte + 1 });
      } else {
        await apiCall("carts", "POST", {
          id: Math.random().toString(36).substr(2, 4),
          productId: id,
          qte: 1,
        });
      }

      window.location.reload(); 
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout au panier");
    }
  };

  return <Product products={products} carts={cartDetails} addCart={handAddCart} />;
}