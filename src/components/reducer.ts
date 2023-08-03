import { Action } from "./App";
import { ToDoData } from "./Todo";

export function reducer(draftState: ToDoData[], action: Action): void {
    const index = draftState.findIndex((todo) => todo.id === action.id);
    switch (action.type) {
        case "complete":
            if (index !== -1) {
                draftState[index].status = "complete";
            }
            break;
        case "incomplete":
            // const index = draftState.findIndex(
            //     (todo) => todo.id === action.id
            // );
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
    }
}
