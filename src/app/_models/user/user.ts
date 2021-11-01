export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    imageUrl: string;
    lastLoginDate: Date;
    lastLoginDateDisplay: Date;
    joinDate: Date;
    roles: string;
    authorities: string[];
    isActive: Boolean;
    isNotLocked: Boolean;
}
