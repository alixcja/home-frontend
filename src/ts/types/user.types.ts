interface User {
    identifier: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    roles: [];
    isHomeAdmin: boolean;
}