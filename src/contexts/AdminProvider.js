import React, { useReducer } from "react";

import { API } from "../helpers/const.js";
import axios, { Axios } from "axios";

export const AdminContext = React.createContext();

const INIT_STATE = {
  autos: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_AUTOS":
      return { ...state, autos: action.payload };
    default:
      return state;
  }
};

const AdminProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const addAuto = async (newAuto) => {
    try {
      await axios.post(API, { ...newAuto, price: +newAuto.price });
    } catch (error) {
      console.log(error);
    }
  };
  const getAutos = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_AUTOS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const saveEditedAuto = async (auto) => {
    try {
      await axios.patch(`${API}/${auto.id}`, {
        ...auto,
        price: +auto.price,
      });
      getAutos();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAuto = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getAutos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        addAuto: addAuto,
        getAutos: getAutos,
        saveEditedAuto: saveEditedAuto,
        deleteAuto: deleteAuto,
        autos: state.autos,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
