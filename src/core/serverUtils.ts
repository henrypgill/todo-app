import axios from "axios";
import { ToDoData, ServerToDoData } from "./ToDoData";

export async function getData(): Promise<ToDoData[]> {
    const fetchURL = "https://todo-app-lgse.onrender.com/todos/";
    // const fetchURL = "http://localhost:4000/todos";
    const response = await axios
        .get<ServerToDoData[]>(fetchURL)
        .then((response) => response.data);
    const returnData = response.map((todo) => {
        const formattedToDO: ToDoData = {
            // id: todo.id,
            // title: todo.title,
            // description: todo.description,
            // status: todo.status,
            ...todo,
            created: new Date(todo.created),
            due: new Date(todo.due),
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
    console.log(fetchURL);
    const response = await axios.delete(fetchURL);

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
    const response = await axios.post(fetchURL, {
        ...todo,
        due: todo.due.getTime(),
        created: todo.due.getTime(),
    });

    return response;
}

export async function getNextServerTodoID() {
    const fetchURL = `https://todo-app-lgse.onrender.com/nextid`;
    const response = await axios
        .get<{ id: number }>(fetchURL)
        .then((response) => response.data.id);

    return response;
}
