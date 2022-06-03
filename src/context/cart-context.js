import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [itemDetail, setItemDetail] = useState({
    id: uuid(),
    selectedBall: "",
    selectedBallPrice: 0,
    qty: 1,
    bag: false,
  });

  const [itemInCart, setItemInCart] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    codeName: "",
    distance: "",
    region: "kanto",
    pokemon: "",
    cart: itemInCart,
  });

  const [users, setUsers] = useState([]);

  const formHandler = () => {
    setUsers([...users, form]);
    localStorage.setItem("users", JSON.stringify([...users, form]));
    setForm({
        fullName: "",
        codeName: "",
        distance: "",
        region: "kanto",
        pokemon: "",
        cart: itemInCart,
    })
  };

  const getUserData = () => {
    JSON.parse(localStorage.getItem("users"));
  };

  const addToCart = () => {
    setItemInCart([...itemInCart, itemDetail]);
    setForm({ ...form, cart: [...form.cart, itemDetail] });
    setItemDetail({
      id: uuid(),
      selectedBall: "",
      selectedBallPrice: 0,
      qty: 1,
      bag: false,
    });
  };

  const updateCart = (updatedItem) => {
    const itemTobeUpdated = itemInCart.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItemInCart(itemTobeUpdated);
    setForm({ ...form, cart: itemTobeUpdated });
    setItemDetail({
      id: uuid(),
      selectedBall: "",
      selectedBallPrice: 0,
      qty: 1,
      bag: false,
    });
  };

  const removeFromCart = (id) => () => {
    const updatedCart = itemInCart.filter((item) => item.id !== id);
    setItemInCart(itemInCart.filter((item) => item.id !== id));
    setForm({ ...form, cart: updatedCart });
    localStorage.setItem(
      "cart",
      JSON.stringify(itemInCart.filter((item) => item.id !== id))
    );
  };

  return (
    <CartContext.Provider
      value={{
        itemDetail,
        addToCart,
        setItemDetail,
        itemInCart,
        removeFromCart,
        updateCart,
        form,
        setForm,
        formHandler,
        getUserData,
        users,
        setUsers,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
