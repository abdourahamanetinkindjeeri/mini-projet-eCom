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

  // const apiCall = async (endpoint, method = "GET", data = null) => {
  //   const response = await fetch(`${API_BASE}/${endpoint}`, {
  //     method,
  //     headers: { "Content-Type": "application/json" },
  //     ...(data && { body: JSON.stringify(data) }),
  //   });

  //   if (!response.ok) throw new Error(`Erreur API: ${response.status}`);
  //   return response.json();
  // };

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
        throw new Error(
          `Erreur API (${method} ${endpoint}): ${response.status}`
        );
      }

      if (response.status === 204) return null;

      return await response.json();
    } catch (error) {
      console.error("Erreur apiCall:", error);
      throw error;
    }
  };

  const handAddCart = async (id) => {
    try {
      const product = products.find((p) => p.id === id);
      const cartItem = carts.find((cart) => cart.productId === id);

      if (!product || product.stock <= 0) {
        console.log("Produit indisponible ou stock insuffisant !");
        return;
      }

      await apiCall(`products/${id}`, "PATCH", { stock: product.stock - 1 });

      if (cartItem) {
        await apiCall(`carts/${cartItem.id}`, "PATCH", {
          qte: cartItem.qte + 1,
        });
      } else {
        await apiCall("carts", "POST", {
          id: Math.random().toString(36).substr(2, 4),
          productId: id,
          qte: 1,
        });
      }

      // window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handRemoveCart = async (id) => {
    try {
      const product = products.find((p) => p.id === id);
      const cartItem = carts.find((cart) => cart.productId === id);

      if (!cartItem) {
        console.log("Produit non trouvé dans le panier !");
        return;
      }

      if (cartItem.qte > 1) {
        await apiCall(`carts/${cartItem.id}`, "PATCH", {
          qte: cartItem.qte - 1,
        });
      } else {
        await apiCall(`carts/${cartItem.id}`, "DELETE");
      }

      if (product) {
        await apiCall(`products/${id}`, "PATCH", { stock: product.stock + 1 });
      }

      // window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handDeleteCart = async (id) => {
    try {
      const product = products.find((p) => p.id === id);
      const cartItem = carts.find((cart) => cart.productId === id);

      if (!cartItem) {
        console.log("Produit non trouvé dans le panier !");
        return;
      }

      await apiCall(`carts/${cartItem.id}`, "DELETE");

      if (product) {
        await apiCall(`products/${id}`, "PATCH", {
          stock: product.stock + cartItem.qte,
        });
      }

      // window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <Product
      products={products}
      carts={cartDetails}
      addCart={handAddCart}
      removeCart={handRemoveCart}
      deleteCart={handDeleteCart}
    />
  );
}
