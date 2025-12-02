import { apiClient } from "./api-client";
import { PaginatedResponse, User, CreateUserData, UpdateUserData } from "./types";

export const getUsers = async (params: {
    page?: number;
    limit?: number;
}): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<PaginatedResponse<User>>('/users', { params });
    return response.data;
};

export const getUser = async (userId: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${userId}`);
    return response.data;
};

export const createUser = async (data: CreateUserData): Promise<User> => {
    const response = await apiClient.post<User>('/auth/admin/users', data);
    return response.data;
};

export const updateUser = async (userId: string, data: UpdateUserData): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${userId}`, data);
    return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
    await apiClient.delete(`/users/${userId}`);
};