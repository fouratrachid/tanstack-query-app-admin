import { apiClient } from "./api-client";
import { PaginatedResponse, Post, UpdatePostData } from "./types";

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

export const updatePost = async (postId: string, data: UpdatePostData): Promise<Post> => {
    const response = await apiClient.patch<Post>(`/posts/${postId}`, data);
    return response.data;
};
