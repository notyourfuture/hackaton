import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { act } from "react-dom/test-utils";
import { calcSubPrice, calcTotalPrice } from "../helpers/calcPrice";
import { API } from "../helpers/const.js";

export const ClientContext = createContext();

let cart = JSON.parse(localStorage.getItem("cart"));
const INIT_STATE = {
  autos: null,
  detail: null,
  autosCount: cart ? cart.autos?.length : 0,
  cart: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_AUTOS":
      return { ...state, autos: action.payload };
    case "GET_AUTO_DETAIL":
      return { ...state, detail: action.payload };
    case "ADD_AND_DELETE_AUTO_IN_CART":
      return { ...state, autosCount: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

const ClientProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getAutos = async () => {
    try {
      const response = await axios(`${API}${window.location.search}`);
      let action = {
        type: "GET_AUTOS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getAutoDetail = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_AUTO_DETAIL",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  //   ! Cart (basket)

  function addAndDeleteAutoInCart(auto) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        autos: [],
        totalPrice: 0,
      };
    }
    let cartAuto = {
      auto: auto,
      count: 1,
      subPrice: 0,
    };
    cartAuto.subPrice = calcSubPrice(cartAuto);

    let check = cart.autos.find((item) => {
      return item.auto.id === auto.id;
    });

    if (!check) {
      cart.autos.push(cartAuto);
    } else {
      cart.autos = cart.products.filter((item) => {
        return item.auto.id !== auto.id;
      });
    }

    cart.totalPrice = calcTotalPrice(cart.autos);
    localStorage.setItem("cart", JSON.stringify(cart));

    let action = {
      type: "ADD_AND_DELETE_AUTO_IN_CART",
      payload: cart.autos.length,
    };

    dispatch(action);
  }

  function checkAutoInCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        autos: [],
      };
    }
    let check = cart.autos?.find((item) => {
      return item.auto.id === id;
    });
    if (!check) {
      return false;
    } else {
      return true;
    }
  }

  function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        totalPrice: 0,
        autos: [],
      };
    }
    let action = {
      type: "GET_CART",
      payload: cart,
    };
    dispatch(action);
  }

  function changeCountCartAuto(value, id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.autos = cart.autos.map((item) => {
      if (item.auto.id === id) {
        item.count = value;
        item.subPrice = calcSubPrice(item);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart.autos);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  function deleteAutoInCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.autos = cart.autos.filter((item) => {
      return item.auto.id !== id;
    });
    cart.totalPrice = calcTotalPrice(cart.autos);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
    let action = {
      type: "ADD_AND_DELETE_AUTO_IN_CART",
      payload: cart.products.length,
    };
    dispatch(action);
  }

  //   ! PAGINATION

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    if (state.autos) {
      setPosts(state.autos);
    }
  }, [state.autos]);

  const indexOfLast = postsPerPage * currentPage;
  const indexOfFirtsPost = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirtsPost, indexOfLast);
  const totalAutosCount = posts.length;

  return (
    <ClientContext.Provider
      value={{
        getAutos: getAutos,
        getAutoDetail: getAutoDetail,
        addAndDeleteAutoInCart: addAndDeleteAutoInCart,
        checkAutoInCart: checkAutoInCart,
        getCart: getCart,
        changeCountCartAuto: changeCountCartAuto,
        deleteAutoInCart: deleteAutoInCart,
        setCurrentPage: setCurrentPage,
        // products: state.products,
        detail: state.detail,
        autosCount: state.autosCount,
        cart: state.cart,
        autos: currentPosts,
        postsPerPage: postsPerPage,
        totalAutosCount: totalAutosCount,
        currentPage: currentPage,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
