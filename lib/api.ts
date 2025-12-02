import { apiClient } from './api-client';
import type {
    User,
    Post,
    Comment,
    PaginatedResponse,
    DashboardStats,
    LoginCredentials,
    AuthResponse,
    AdminSignupData,
    CreateUserData,
    UpdateUserData
} from './types';

// ========== Auth API ==========
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

// ========== Users API ==========
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

// ========== Posts API ==========
export const getPosts = async (params: {
    page?: number;
    limit?: number;
    search?: string;
    userId?: string;
}): Promise<PaginatedResponse<Post>> => {
    const response = await apiClient.get<PaginatedResponse<Post>>('/posts', { params });
    console.log(response);
    return response.data;
};

export const getPost = async (postId: string): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${postId}`);
    return response.data;
};

export const deletePost = async (postId: string): Promise<void> => {
    await apiClient.delete(`/posts/${postId}`);
};

export const togglePostPublish = async (postId: string): Promise<Post> => {
    const response = await apiClient.patch<Post>(`/admin/posts/${postId}/toggle-publish`);
    return response.data;
};

// ========== Comments API ==========
export const getComments = async (params: {
    page?: number;
    limit?: number;
    postId?: string;
}): Promise<PaginatedResponse<Comment>> => {
    const response = await apiClient.get<PaginatedResponse<Comment>>('/admin/comments', { params });
    console.log(response);
    return response.data;
};

export const deleteComment = async (commentId: string): Promise<void> => {
    await apiClient.delete(`/posts/comments/${commentId}`);
};

// ========== Dashboard Stats API ==========
export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>('/stats/dashboard');
    return response.data;
};
