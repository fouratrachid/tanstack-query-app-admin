import { apiClient } from "./api-client";
import { PaginatedResponse, UpdateCommentData } from "./types";

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

export const updateComment = async (commentId: string, data: UpdateCommentData): Promise<Comment> => {
    const response = await apiClient.patch<Comment>(`/posts/comments/${commentId}`, data);
    return response.data;
};
