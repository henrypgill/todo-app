import { useState } from "react";
import { ToDoData } from "./ToDoData";
import { Action } from "./reducer";
import { ToDoEditing } from "./Todo";

interface ToDoDescriptionProps {
    todo: ToDoData;
    editing: ToDoEditing;
    handleDispatch(action: Action): void;
    setEditing(val: ToDoEditing): void;
}

export function ToDoDescription({
    todo,
    editing,
    handleDispatch,
    setEditing,
}: ToDoDescriptionProps): JSX.Element {
    const [description, setDescription] = useState<string>(todo.description);

    function handleDescriptionChange(val: string) {
        setDescription(val);
    }

    function handleSaveDescription() {
        const action: Action = {
            id: todo.id,
            type: "update-description",
            value: { ...todo, description: description },
        };
        handleDispatch(action);
        setEditing("none");
    }

    if (editing === "description") {
        return (
            <input
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="todo-description todo-description-input"
                onBlur={handleSaveDescription}
            ></input>
        );
    } else {
        return (
            <p
                className="todo-description todo-description-paragraph"
                onDoubleClick={() => setEditing("description")}
            >
                {description}
            </p>
        );
    }
}
