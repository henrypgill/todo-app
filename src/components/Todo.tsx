import { Action } from "./reducer";
import { useState } from "react";
import { ToDoData } from "./ToDoData";
import { formatDate } from "./utils";
import { ToDoDescription } from "./ToDoDescription";
import { ToDoStatus } from "./ToDoStatus";
import { ToDoTitle } from "./ToDoTitle";

export interface ToDoProps {
    todo: ToDoData;
    handleDispatch(action: Action): void;
}

export type ToDoEditing = "none" | "title" | "description";

export function ToDo({ todo, handleDispatch }: ToDoProps): JSX.Element {
    const [editing, setEditing] = useState<ToDoEditing>("none");
    const [showing, setShowing] = useState<boolean>(false);

    function handleDelete() {
        const action: Action = {
            id: todo.id,
            type: "delete",
            value: todo,
        };
        handleDispatch(action);
    }

    function handleToggle() {
        showing ? setShowing(false) : setShowing(true);
    }

    function getTodoClassName() {
        const classNames: string[] = ["todo-card"];
        const cardShowing = showing ? "card-open" : "card-closed";
        const cardStatus = `card-${todo.status}`;

        return [classNames, cardShowing, cardStatus].join(" ");
    }

    return (
        <div className={getTodoClassName()}>
            <div className="title-and-button-container">
                <ToDoTitle
                    todo={todo}
                    editing={editing}
                    setEditing={setEditing}
                    handleDispatch={handleDispatch}
                />
                <div className="todo-buttons-container">
                    <button
                        className="todo-toggle-button"
                        onClick={handleToggle}
                    >
                        {showing ? "-" : "+"}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="todo-delete-button"
                    >
                        🗑️
                    </button>
                </div>
            </div>
            {showing && (
                <ToDoDescription
                    todo={todo}
                    editing={editing}
                    setEditing={setEditing}
                    handleDispatch={handleDispatch}
                />
            )}
            {showing && (
                <div className="todo-info">
                    <ToDoStatus todo={todo} handleDispatch={handleDispatch} />
                    <div className="todo-info-dates">
                        <h4>created: {formatDate(todo.created)}</h4>
                        <h4>due: {formatDate(todo.due)}</h4>
                    </div>
                </div>
            )}
        </div>
    );

    // onKeyUpCapture={(e) => e.key === "Enter" ? setEditingDescription(false): null}
}
