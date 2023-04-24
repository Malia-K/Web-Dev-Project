export interface Category{
    id: number;
    title: string;
}

export interface Todo{
    id: number;
    description: string;
    completed: boolean;
    category: number;
}