import { Action } from "./App";
import { Dispatch } from "react";
import {
    addToDo,
    completeToDo,
    deleteToDo,
    incompleteToDo,
    updateToDoTitle,
    updateToDoDescription,
} from "./serverUtils";

export function handleDispatch(
    dispatch: Dispatch<Action>
): (action: Action) => void {
    return (action: Action) => {
        switch (action.type) {
            case "complete":
                completeToDo(action.value);
                dispatch(action);
                break;
            case "incomplete":
                incompleteToDo(action.value);
                dispatch(action);
                break;
            case "delete":
                deleteToDo(action.value);
                dispatch(action);
                break;
            case "update-title":
                updateToDoTitle(action.value);
                dispatch(action);
                break;
            case "update-description":
                updateToDoDescription(action.value);
                dispatch(action);
                break;
            case "add":
                addToDo(action.value);
                dispatch(action);
                break;
        }
    };
}
