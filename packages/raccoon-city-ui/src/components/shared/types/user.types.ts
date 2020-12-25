export interface role {
    displayName: string;
    key: string;
}

export interface userInfo {
    email: string;
    id: string;
    role: role;
}
