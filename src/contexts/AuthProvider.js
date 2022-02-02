import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import React, { useEffect, useReducer } from "react";

export const AuthContext = React.createContext();

const INIT_STATE = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHECK_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const authWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const googleProvider = new GoogleAuthProvider();

  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      let action = {
        type: "CHECK_USER",
        payload: user,
      };
      dispatch(action);
    });
  };

  useEffect(() => {
    checkUser();
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authWithGoogle: authWithGoogle,
        logOut: logOut,
        user: state.user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
