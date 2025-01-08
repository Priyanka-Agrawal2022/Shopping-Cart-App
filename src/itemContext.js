import { createContext, useContext, useState } from "react";
import CartModal from "./components/CartModal";

const itemContext = createContext();

function CustomItemContext({ children }) {
  const [total, setTotal] = useState(0);
  const [item, setItem] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const handleAdd = ({ id, name, price }) => {
    const index = cart.findIndex((d) => d.id === id);

    if (index === -1) {
      setCart([...cart, { id, name, price, qty: 1 }]);
    } else {
      cart[index].qty++;
      setCart(cart);
    }

    setItem(item + 1);
    setTotal(total + price);
  };

  const handleRemove = (id) => {
    const index = cart.findIndex((d) => d.id === id);

    if (index !== -1) {
      cart[index].qty--;

      if (item > 0) setItem(item - 1);
      if (total > 0) setTotal(total - cart[index].price);

      if (cart[index].qty === 0) {
        cart.splice(index, 1);
      }

      setCart(cart);
    }
  };

  const reset = () => {
    setItem(0);
    setTotal(0);
    setCart([]);
  };

  const toggle = () => {
    setShowCart(!showCart);
  };

  return (
    <itemContext.Provider
      value={{
        total,
        item,
        handleAdd,
        handleRemove,
        reset,
        toggle,
        cart,
        setCart,
      }}
    >
      {showCart ? <CartModal /> : children}
    </itemContext.Provider>
  );
}

function useItemContext() {
  const value = useContext(itemContext);
  return value;
}

export { itemContext, useItemContext };
export default CustomItemContext;
