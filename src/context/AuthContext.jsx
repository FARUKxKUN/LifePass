import { createContext, useContext, useState } from 'react';
import { DEMO_PATIENTS, DEMO_DOCTORS } from '../data/mockData';

const AuthContext = createContext(null);

const allUsers = [
    ...DEMO_PATIENTS.map((p) => ({ ...p, role: 'patient' })),
    ...DEMO_DOCTORS.map((d) => ({ ...d, role: 'doctor' })),
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        const found = allUsers.find(
            (u) => u.email === email && u.password === password
        );
        if (!found) return { success: false, error: 'Email ou mot de passe incorrect' };
        setUser(found);
        return { success: true, user: found };
    };

    const signup = (userData) => {
        // In a real app, this would call Supabase. For now, just set the user.
        const newUser = {
            id: `${userData.role}-${Date.now()}`,
            ...userData,
            avatar: userData.role === 'patient' ? '👤' : '👨‍⚕️',
        };
        setUser(newUser);
        return { success: true, user: newUser };
    };

    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
