'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [router]);

    const logout = () => {
        console.log('logout');
        const accessToken = localStorage.getItem('accessToken');
        console.log("\n access token\n ---- \n ", accessToken);
        const refreshToken = localStorage.getItem('refreshToken');
        console.log("\n refresh token\n ---- \n ", refreshToken);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        router.push('/login');
    };

    return { isAuthenticated, isLoading, logout };
}
