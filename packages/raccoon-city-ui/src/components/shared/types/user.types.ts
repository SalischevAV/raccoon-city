export interface role {
    displayName: string;
    key: string;
    features: Array<string>;
}

export interface userInfo {
    name: string;
    email: string;
    id: string;
    role: role;
}
