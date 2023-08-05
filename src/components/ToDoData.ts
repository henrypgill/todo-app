export interface ToDoData {
    id: number;
    title: string;
    description: string;
    status: "complete" | "incomplete";
    created: Date; //format dd-mm-yy
    due: Date; //format dd-mm-yy
}

export interface ServerToDoData {
    id: number;
    title: string;
    description: string;
    status: "complete" | "incomplete";
    created: number[];
    due: number[];
}
