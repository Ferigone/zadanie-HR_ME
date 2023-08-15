import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";

export const FirebaseAuthContext = createContext({
  user: null as FirebaseUser | null,
  loginWithGoogle: () => {},
  logout: () => {},
});

export const FirebaseAuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{ user, loginWithGoogle, logout }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  return useContext(FirebaseAuthContext);
};
