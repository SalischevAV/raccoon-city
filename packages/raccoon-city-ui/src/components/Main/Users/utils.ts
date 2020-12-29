export interface UserFormValues {
    name: string;
    id: string;
    role: string;
    email: string;
    isDeleted: string;
}

export function getUserDataVariables(userData: UserFormValues) {
    const {name, id, role, email, isDeleted} = userData;
    return {
        name,
        id,
        role,
        email,
        isDeleted: isDeleted === 'true'
    };
}
