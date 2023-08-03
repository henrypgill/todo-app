import axios from "axios";
import { ToDoData, ServerToDoData } from "./ToDoData";

export async function getData(): Promise<ToDoData[]> {
    const fetchURL = "https://todo-app-lgse.onrender.com/todos/";
    const response = await axios
        .get<ServerToDoData[]>(fetchURL)
        .then((response) => response.data);

    const returnData = response.map((todo) => {
        const formattedToDO: ToDoData = {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            status: todo.status,
            created: new Date(
                todo.created[0],
                todo.created[1],
                todo.created[2],
                todo.created[3],
                todo.created[4]
            ),
            due: new Date(
                todo.due[0],
                todo.due[1],
                todo.due[2],
                todo.due[3],
                todo.due[4]
            ),
        };
        return formattedToDO;
    });
    return returnData;
}

export async function getToDo(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios
        .get(fetchURL)
        .then((response) => response.data);

    return response;
}

export async function deleteToDo(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.delete(fetchURL); //{id: `${todo.id}`}

    return response;
}

export async function updateToDoTitle(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.patch(fetchURL, {
        title: todo.title,
    });

    return response;
}

export async function updateToDoDescription(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.patch(fetchURL, {
        description: todo.description,
    });

    return response;
}

export async function completeToDo(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.patch(fetchURL, { status: "complete" });

    return response;
}

export async function incompleteToDo(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.patch(fetchURL, { status: "incomplete" });

    return response;
}

export async function addToDo(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.delete(fetchURL).then((response) => response);

    return response;
}
