export interface UserFormValues {
    name: string;
    id: string;
    role: string;
    email: string;
    isDeleted: string;
    developer: string;
}

export function getUserDataVariables(userData: UserFormValues) {
    const {name, id, role, email, isDeleted, developer} = userData;
    return {
        name,
        id,
        role,
        email,
        isDeleted: isDeleted === 'true',
        developer
    };
}
