import { apiClient } from './api-client';
import type {

    DashboardStats,

} from './types';


export const getDashboardStats = async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>('/stats/dashboard');
    return response.data;
};
