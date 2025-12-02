import { apiClient } from "./api-client";
import { LoginCredentials, AuthResponse, AdminSignupData, User } from "./types";

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
};

export const adminSignup = async (data: AdminSignupData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/admin/signup', data);
    return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
};