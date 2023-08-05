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

export async function getServerToDo(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios
        .get(fetchURL)
        .then((response) => response.data);

    return response;
}

export async function deleteServerToDo(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.delete(fetchURL); //{id: `${todo.id}`}

    return response;
}

export async function updateServerToDoTitle(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.patch(fetchURL, {
        title: todo.title,
    });

    return response;
}

export async function updateServerToDoDescription(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.patch(fetchURL, {
        description: todo.description,
    });

    return response;
}

export async function completeServerToDo(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.patch(fetchURL, { status: "complete" });

    return response;
}

export async function incompleteServerToDo(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos/${todo.id}`;
    const response = await axios.patch(fetchURL, { status: "incomplete" });

    return response;
}

export async function addServerToDo(todo: ToDoData) {
    const fetchURL = `https://todo-app-lgse.onrender.com/todos`;
    const response = await axios.post(fetchURL, { ...todo });

    return response;
}

export async function getNextServerTodoID() {
    const fetchURL = `https://todo-app-lgse.onrender.com/nextid`;
    const response = await axios
        .get<{ id: number }>(fetchURL)
        .then((response) => response.data.id);

    return response;
}
