
import { Action } from "./App";
import {useState} from "react"


export interface ToDoData {
    id: number;
    title: string;
    description: string;
    created: string; //format dd-mm-yy
    due: string; //format dd-mm-yy
    status: string;
}

export interface ToDoProps {
    todo: ToDoData;
    dispatch(action: Action): void;
}

export function ToDo({todo, dispatch}: ToDoProps): JSX.Element {

    const [title, setTitle] = useState<string>(todo.title)
    const [description, setDescription] = useState<string>(todo.description)


    function handleTitleChange(val: string){
        setTitle(val)
    }
    function handleDescriptionChange(val: string){
        setDescription(val);
    }

    function handleDelete(){
        const action: Action = {
            id: todo.id,
            type: "delete",
            value: todo,
        }
        dispatch(action)
    }
    function handleComplete(){
        const action: Action = {
            id: todo.id,
            type: "complete",
            value: {...todo, status: "complete"},
        }
        dispatch(action)
    }
    function handleSave(){
        const action: Action = {
            id: todo.id,
            type: "update",
            value: {...todo, title: title, description: description},
        }
        dispatch(action)
    }

    // if (!editing) {
    return (
        <div className="todo-card">
            <input value={title} onChange={(e) => handleTitleChange(e.target.value)} className="todo-title"></input>
            <input value={description} onChange={(e => handleDescriptionChange(e.target.value))} className="todo-description"></input>
            <h3>{todo.status}</h3>
            <div>
                <button onClick={handleDelete} className="todo-button">delete</button>
                <button onClick={handleSave} className="todo-button">save</button>
                {todo.status !== "complete" && <button onClick={handleComplete} className="todo-button">complete</button>}
            </div>
        </div>
    );
// } else {
//     return (
//         <input value={headingText} className="new-procedure-heading-input" onChange={(e) => logNchange(e.target.value)} onBlur={(e) => headingFocusLeave(e.target.value)}></input>
//     );
// }
}
