import { useState } from "react";
import { ToDoData } from "../core/ToDoData";
import { ToDoEditing } from "./Todo";
import { Action } from "../core/reducer";

interface ToDoTitleProps {
    todo: ToDoData;
    editing: ToDoEditing;
    setEditing(editing: ToDoEditing): void;
    handleDispatch(action: Action): void;
}

export function ToDoTitle({
    todo,
    editing,
    setEditing,
    handleDispatch,
}: ToDoTitleProps): JSX.Element {
    const [title, setTitle] = useState<string>(todo.title);

    function handleSaveTitle() {
        const action: Action = {
            id: todo.id,
            type: "update-title",
            value: { ...todo, title: title },
        };
        handleDispatch(action);
        setEditing("none");
    }

    function handleTitleChange(val: string) {
        setTitle(val);
    }

    if (editing === "title") {
        return (
            <input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="todo-title todo-title-input"
                onBlur={handleSaveTitle}
            ></input>
        );
    } else {
        return (
            <h3
                className="todo-title todo-title-heading"
                onDoubleClick={() => setEditing("title")}
            >
                {title}
            </h3>
        );
    }
}
