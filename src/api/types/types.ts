export interface UserProfile {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
}
