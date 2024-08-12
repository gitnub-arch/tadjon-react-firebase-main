import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { auth, db } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const { uid } = auth.currentUser;

      const userDoc = doc(db, "users", uid);
      
      await updateDoc(userDoc, { online: false });
      await signOut(auth);

      dispatch({ type: "LOGOUT" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, logout };
};