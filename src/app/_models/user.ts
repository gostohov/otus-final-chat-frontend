export class User {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    profileImageUrl: string;
    lastLoginDate: Date;
    lastLoginDateDisplay: Date;
    joinDate: Date;
    roles: string;
    authorities: string[];
    isActive: Boolean;
    isNotLocked: Boolean;
}
