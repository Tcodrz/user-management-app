export interface IUser {
    name: string;
    email: string;
    address?: { street: string, city: string, zipcode: any };
    id?: number;
}

export interface ITodo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

export interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}