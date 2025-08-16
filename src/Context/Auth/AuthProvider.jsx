import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  
} from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase.init";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, provider);
  };
  const updateUserProfile= (updatedInfo)=>{
    return updateProfile(auth.currentUser,updatedInfo)
  }
  const logOut = () => {
    setLoading(false);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const authInfo = { registerUser, user, signIn, logOut, loading ,googleSignIn,updateUserProfile};
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
