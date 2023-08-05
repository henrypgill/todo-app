import { Action } from "./reducer";
import { Dispatch } from "react";
import {
    addServerToDo,
    completeServerToDo,
    deleteServerToDo,
    incompleteServerToDo,
    updateServerToDoTitle,
    updateServerToDoDescription,
} from "./serverUtils";

export function dispatchHandler(
    dispatch: Dispatch<Action>
): (action: Action) => void {
    return (action: Action) => {
        switch (action.type) {
            case "complete":
                completeServerToDo(action.value);
                dispatch(action);
                break;
            case "incomplete":
                incompleteServerToDo(action.value);
                dispatch(action);
                break;
            case "delete":
                deleteServerToDo(action.value);
                dispatch(action);
                break;
            case "update-title":
                updateServerToDoTitle(action.value);
                dispatch(action);
                break;
            case "update-description":
                updateServerToDoDescription(action.value);
                dispatch(action);
                break;
            case "new-todo":
                addServerToDo(action.value);
                dispatch({ ...action, type: "add" });
                break;
            default:
                dispatch(action);
                break;
        }
    };
}
