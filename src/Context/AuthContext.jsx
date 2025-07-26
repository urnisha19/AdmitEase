import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../firebase";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Save user to MongoDB and return saved profile (or null)
  const saveUserToDB = async (user) => {
    try {
      const token = await user.getIdToken();

      const userInfo = {
        email: user.email,
        name: user.displayName || "Anonymous",
        photo: user.photoURL || "",
      };

      const res = await fetch("https://admitease-server.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo),
      });

      if (!res.ok) {
        console.warn("User not saved to MongoDB.");
        return null;
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to save user to MongoDB:", err);
      return null;
    }
  };

  const fetchUserProfile = async (
    email,
    token,
    retries = 3,
    delayMs = 1000
  ) => {
    const encodedEmail = encodeURIComponent(email);

    for (let i = 0; i < retries; i++) {
      const res = await fetch(
        `https://admitease-server.onrender.com/api/users/${encodedEmail}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        return await res.json();
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    return null;
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerUser = async (email, password) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const savedUser = await saveUserToDB(result.user);
    if (savedUser) setProfile(savedUser);
    return result;
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    return signOut(auth);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const savedUser = await saveUserToDB(result.user);
    if (savedUser) setProfile(savedUser);
    return result;
  };

  const facebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const savedUser = await saveUserToDB(result.user);
    if (savedUser) setProfile(savedUser);
    return result;
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        try {
          const token = await currentUser.getIdToken();
          localStorage.setItem("access-token", token);

          const profileData = await fetchUserProfile(currentUser.email, token);
          if (profileData) {
            setProfile(profileData);
          } else {
            console.warn("User profile not found in DB after retries.");
            setProfile(null);
          }
        } catch (err) {
          console.error("Failed to fetch profile:", err);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        loginUser,
        registerUser,
        logout,
        googleSignIn,
        facebookSignIn,
        resetPassword,
        setProfile,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
