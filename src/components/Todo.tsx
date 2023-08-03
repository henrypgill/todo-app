import { Action } from "./reducer";
import { useState } from "react";
import { ToDoData } from "./ToDoData";

export interface ToDoProps {
    todo: ToDoData;
    dispatch(action: Action): void;
}

export function ToDo({ todo, dispatch }: ToDoProps): JSX.Element {
    const [title, setTitle] = useState<string>(todo.title);
    const [description, setDescription] = useState<string>(todo.description);
    const [editing, setEditing] = useState<"none" | "title" | "description">(
        "none"
    );
    // const [editingTitle, setEditingTitle] = useState<boolean>(false);
    // const [editingDescription, setEditingDescription] =
    //     useState<boolean>(false);
    const [showing, setShowing] = useState<boolean>(true);

    function handleTitleChange(val: string) {
        setTitle(val);
    }
    function handleDescriptionChange(val: string) {
        setDescription(val);
    }

    function handleDelete() {
        const action: Action = {
            id: todo.id,
            type: "delete",
            value: todo,
        };
        dispatch(action);
    }
    function handleComplete() {
        const action: Action = {
            id: todo.id,
            type: "complete",
            value: { ...todo, status: "complete" },
        };
        dispatch(action);
    }
    function handleIncomplete() {
        const action: Action = {
            id: todo.id,
            type: "incomplete",
            value: { ...todo, status: "incomplete" },
        };
        dispatch(action);
    }
    function handleSaveTitle() {
        const action: Action = {
            id: todo.id,
            type: "update-title",
            value: { ...todo, title: title, description: description },
        };
        dispatch(action);
        setEditing("none");
    }
    function handleSaveDescription() {
        const action: Action = {
            id: todo.id,
            type: "update-description",
            value: { ...todo, title: title, description: description },
        };
        dispatch(action);
        setEditing("none");
    }

    function handleToggle() {
        showing ? setShowing(false) : setShowing(true);
    }

    return (
        <div className="todo-card">
            <div className="title-and-button-container">
                {editing === "title" ? (
                    <input
                        value={title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="todo-title"
                        onBlur={handleSaveTitle}
                    ></input>
                ) : (
                    <h3 onDoubleClick={() => setEditing("title")}>{title}</h3>
                )}
                <button onClick={handleToggle}>{showing ? "-" : "+"}</button>
            </div>
            {showing && (
                <div className="todo-info">
                    {editing === "description" ? (
                        <input
                            value={description}
                            onChange={(e) =>
                                handleDescriptionChange(e.target.value)
                            }
                            className="todo-description"
                            onBlur={handleSaveDescription}
                        ></input>
                    ) : (
                        <p onDoubleClick={() => setEditing("description")}>
                            {description}
                        </p>
                    )}
                    <h4>created: {todo.created.toTimeString()}</h4>
                    <h4>due: {todo.due.toTimeString()}</h4>
                    <h4>{todo.status}</h4>
                    <div>
                        <button onClick={handleDelete} className="todo-button">
                            delete
                        </button>
                        {todo.status === "incomplete" ? (
                            <button
                                onClick={handleComplete}
                                className="todo-button"
                            >
                                mark as complete
                            </button>
                        ) : (
                            <button
                                onClick={handleIncomplete}
                                className="todo-button"
                            >
                                mark as incomplete
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    // onKeyUpCapture={(e) => e.key === "Enter" ? setEditingDescription(false): null}
}
