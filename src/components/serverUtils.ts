import axios from "axios";
import { ToDoData } from "./Todo";

export async function getData(): Promise<ToDoData[]> {
    const fetchURL = "https://todo-app-lgse.onrender.com/todos/";
    const response = await axios
        .get<ToDoData[]>(fetchURL)
        .then((response) => response.data);
    return response;
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
