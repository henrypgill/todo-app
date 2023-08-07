import { ToDoData } from "./ToDoData";
import { compareStatus } from "../components/utils";

export interface Action {
    id: number;
    type:
        | "complete"
        | "delete"
        | "update-title"
        | "update-description"
        | "add"
        | "incomplete"
        | "sort-status"
        | "sort-due"
        | "sort-created"
        | "sort-id"
        | "new-todo";
    value: ToDoData;
}

export function reducer(draftState: ToDoData[], action: Action): void {
    const index = draftState.findIndex((todo) => todo.id === action.id);
    switch (action.type) {
        case "complete":
            if (index !== -1) {
                draftState[index].status = "complete";
            }
            break;
        case "incomplete":
            if (index !== -1) {
                draftState[index].status = "incomplete";
            }
            break;
        case "delete":
            draftState.splice(index, 1);
            break;
        case "update-title":
            if (index !== -1) {
                draftState[index].title = action.value.title;
            }
            break;
        case "update-description":
            if (index !== -1) {
                draftState[index].description = action.value.description;
            }
            break;
        case "add":
            if (index === -1) {
                draftState.push(action.value);
            }
            break;
        case "sort-created":
            draftState.sort(
                (a, b) => a.created.getTime() - b.created.getTime()
            );
            break;
        case "sort-due":
            draftState.sort((a, b) => a.due.getTime() - b.due.getTime());
            break;
        case "sort-status":
            draftState.sort((a, b) => compareStatus(a, b));
            break;
        case "sort-id":
            draftState.sort((a, b) => a.id - b.id);
            break;
        case "new-todo":
            draftState.push(action.value);
            break;
        default:
            break;
    }
}
