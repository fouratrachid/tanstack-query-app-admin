'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useAuth() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, [router]);

    const logout = () => {
        localStorage.removeItem('admin_token');
        router.push('/login');
    };

    return { isAuthenticated, isLoading, logout };
}
