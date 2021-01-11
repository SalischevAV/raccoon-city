import {Developer} from './developer.type';
export interface role {
    id: string;
    displayName: string;
    key: string;
    features: Array<string>;
}

export interface userInfo {
    name: string;
    email: string;
    id: string;
    role: role;
    isDeleted: boolean;
    developer: Developer;
}
