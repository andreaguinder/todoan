import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
// 🚀 Importamos directamente el auth y el provider que ya configuraste en tu firebase.js
import { auth, googleProvider } from '../config/firebase'; 

const AuthContext = createContext();

// Forzamos a que siempre pida seleccionar cuenta de Google, evitando logueos automáticos cruzados
googleProvider.setCustomParameters({ prompt: 'select_account' });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = () => {
        setAuthLoading(true);
        // Usamos las instancias importadas de tu config
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        setAuthLoading(true);
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, authLoading, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}