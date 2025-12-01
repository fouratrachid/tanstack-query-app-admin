import { apiClient } from './api-client';
import type { User, Post, Comment, PaginatedResponse, DashboardStats, LoginCredentials, AuthResponse } from './types';

// ========== Auth API ==========
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
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
    search?: string;
}): Promise<PaginatedResponse<User>> => {
    const response = await apiClient.get<PaginatedResponse<User>>('/admin/users', { params });
    return response.data;
};

export const getUser = async (userId: string): Promise<User> => {
    const response = await apiClient.get<User>(`/admin/users/${userId}`);
    return response.data;
};

export const deleteUser = async (userId: string): Promise<void> => {
    await apiClient.delete(`/admin/users/${userId}`);
};

// ========== Posts API ==========
export const getPosts = async (params: {
    page?: number;
    limit?: number;
    search?: string;
    userId?: string;
}): Promise<PaginatedResponse<Post>> => {
    const response = await apiClient.get<PaginatedResponse<Post>>('/posts', { params });
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
    return response.data;
};

export const deleteComment = async (commentId: string): Promise<void> => {
    await apiClient.delete(`/posts/comments/${commentId}`);
};

// ========== Dashboard Stats API ==========
export const getDashboardStats = async (): Promise<DashboardStats> => {
    // This would need to be implemented in your backend
    // For now, returning mock data
    const [users, posts] = await Promise.all([
        getUsers({ limit: 1 }),
        getPosts({ limit: 1 }),
    ]);

    return {
        totalUsers: users.meta.total,
        totalPosts: posts.meta.total,
        totalComments: 0,
        totalLikes: 0,
        usersGrowth: 12.5,
        postsGrowth: 8.2,
        commentsGrowth: 15.3,
        likesGrowth: 6.7,
    };
};
