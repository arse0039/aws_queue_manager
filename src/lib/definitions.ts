export interface StudentData {
    sessionID: string;
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    description: string;
    dateAdded: Date;
}

export interface UserData {
    userID: string,
    sessionID: number
}