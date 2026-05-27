import { useState } from "react";
import "./App.css";

function App() {
  const dishes = [
  {
    id: 1,
    name: "Cold Coffee",
    quantity: "500ml",
    price: "₹120",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
  },
  {
    id: 2,
    name: "Mango Shake",
    quantity: "500ml",
    price: "₹150",
    image:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
  },
  {
    id: 3,
    name: "Chocolate Smoothie",
    quantity: "500ml",
    price: "₹180",
    image:
      "https://images.unsplash.com/photo-1577805947697-89e18249d767",
  },
  {
    id: 4,
    name: "Strawberry Shake",
    quantity: "500ml",
    price: "₹160",
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888",
  },
];

  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const addToCart = (id) => {
    setCart({
      ...cart,
      [id]: 1,
    });
  };

  const increaseQty = (id) => {
    setCart({
      ...cart,
      [id]: cart[id] + 1,
    });
  };

  const decreaseQty = (id) => {
    if (cart[id] === 1) {
      const updatedCart = { ...cart };
      delete updatedCart[id];
      setCart(updatedCart);
    } else {
      setCart({
        ...cart,
        [id]: cart[id] - 1,
      });
    }
  };

  return (
    <div className="container">
      {/* CART PAGE */}
      {showCart ? (
        <div>
          <div className="cart-header">
            <h1>Your Cart</h1>

            <button
              className="back-btn"
              onClick={() => setShowCart(false)}
            >
              Back To Home
            </button>
          </div>

          <div className="cart-items">
            {Object.keys(cart).length === 0 ? (
              <h2>Cart is Empty</h2>
            ) : (
              dishes
                .filter((item) => cart[item.id])
                .map((item) => (
                  <div className="cart-card" key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.quantity}</p>
                    <p>Quantity : {cart[item.id]}</p>
                  </div>
                ))
            )}
          </div>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <header className="header">
            <div className="logo">
              <h1>Rasoi Ghar🍽️</h1>
            </div>

            <button
              className="cart-btn"
              onClick={() => setShowCart(true)}
            >
              Cart
            </button>
          </header>

          {/* BODY */}
          <div className="dish-container">
            {dishes.map((item) => (
              <div className="dish-card" key={item.id}>
                <img
                src={item.image}
                alt={item.name}
                className="dish-image"
                />
                <h2>{item.name}</h2>
                <p>{item.quantity}</p>
                <h3>{item.price}</h3>

                {cart[item.id] ? (
                  <div className="qty-box">
                    <button onClick={() => decreaseQty(item.id)}>
                      -
                    </button>

                    <span>{cart[item.id]}</span>

                    <button onClick={() => increaseQty(item.id)}>
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="add-btn"
                    onClick={() => addToCart(item.id)}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;