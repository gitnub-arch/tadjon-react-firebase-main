import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { auth, db, storage } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const signup = async (email, password, displayName, avatar) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!response) {
        setError("Не получилось создать пользователя");
      }

      const uploadPath = `avatars/${response.user.uid}/${avatar.name}`;
      const storageRef = ref(storage, uploadPath);
      const uploadResult = await uploadBytes(storageRef, avatar);
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(response.user, {
        displayName,
        photoURL,
      });

      await setDoc(doc(db, "users", response.user.uid), {
        online: true,
        displayName,
        photoURL,
      });

      dispatch({ type: "LOGIN", payload: response.user });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
