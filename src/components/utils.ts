import { ToDoData } from "./ToDoData";

export function compareStatus(a: ToDoData, b: ToDoData): 1 | -1 | 0 {
    if (a.status === b.status) {
        return 0;
    } else if (a.status === "incomplete" && b.status === "complete") {
        return -1;
    } else if (a.status === "complete" && b.status === "incomplete") {
        return 1;
    } else {
        return 0;
    }
}

export function emptyToDo(): ToDoData {
    const emptyToDo: ToDoData = {
        id: -1,
        title: "To-Do: Title",
        description: "To-Do: Description",
        created: new Date(),
        due: new Date(),
        status: "incomplete",
    };
    return emptyToDo;
}
