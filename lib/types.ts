// User Types
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    _count?: {
        posts: number;
        comments: number;
    };
}

// Post Types
export interface Author {
    id: string;
    name: string;
    email: string;
    avatarUrl: string | null;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    imageUrl?: string | null;
    isPublished: boolean;
    author: Author;
    commentsCount: number;
    likesCount: number;
    createdAt: string;
    updatedAt: string;
}

// Comment Types
export interface Comment {
    id: string;
    content: string;
    postId: string;
    user: Author;
    post?: {
        id: string;
        title: string;
    };
    createdAt: string;
    updatedAt: string;
}

// Pagination Types
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

// Stats Types
export interface DashboardStats {
    totalUsers: number;
    totalPosts: number;
    totalComments: number;
    totalLikes: number;
    usersGrowth: number;
    postsGrowth: number;
    commentsGrowth: number;
    likesGrowth: number;
}

// Auth Types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
}
