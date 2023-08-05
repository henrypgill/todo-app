import { useEffect } from "react";
import { ToDoData } from "./ToDoData";
import { useImmerReducer } from "use-immer";
import { Action } from "./reducer";
import { getNextServerTodoID } from "./serverUtils";

interface NewToDoProps {
    handleDispatch(action: Action): void;
}

interface ToDoAction {
    field: keyof ToDoData;
    value: ToDoData;
}

export function NewToDo({ handleDispatch }: NewToDoProps): JSX.Element {
    const initialNewToDo: ToDoData = {
        id: -1,
        title: "title",
        description: "description",
        status: "incomplete",
        created: new Date(),
        due: new Date(),
    };

    const [todo, dispatchToDo] = useImmerReducer(todoReducer, initialNewToDo);

    function todoReducer(draftTodo: ToDoData, todoAction: ToDoAction) {
        switch (todoAction.field) {
            case "title":
                draftTodo.title = todoAction.value.title;
                break;
            case "description":
                draftTodo.description = todoAction.value.description;
                break;
            case "due":
                draftTodo.due.setTime(todoAction.value.due.getTime());
                break;
            case "id":
                draftTodo.id = todoAction.value.id;
                break;
        }
    }

    useEffect(() => {
        const updateID = async () => {
            const newID = await getNextServerTodoID();
            const action: ToDoAction = {
                field: "id",
                value: { ...todo, id: newID },
            };
            dispatchToDo(action);
        };
        updateID();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleUpdateTitle(newTitle: string) {
        const action: ToDoAction = {
            field: "title",
            value: { ...todo, title: newTitle },
        };
        dispatchToDo(action);
    }
    function handleUpdateDescription(newDescription: string) {
        const action: ToDoAction = {
            field: "description",
            value: { ...todo, description: newDescription },
        };
        dispatchToDo(action);
    }
    function handleUpdateDue(field: string, fieldValue: number) {
        const action: ToDoAction = { field: "title", value: { ...todo } };
        switch (field) {
            case "day":
                action.value.due.setDate(fieldValue);
                break;
            case "month":
                action.value.due.setDate(fieldValue);
                break;
            case "hours":
                action.value.due.setDate(fieldValue);
                break;
            case "minutes":
                action.value.due.setDate(fieldValue);
                break;
        }
        dispatchToDo(action);
    }

    function handleSaveTodo() {
        console.log("saving todo");

        const todoAction: ToDoAction = {
            field: "id",
            value: { ...todo, id: todo.id + 1 },
        };
        const action: Action = {
            id: todo.id,
            type: "new-todo",
            value: todo,
        };
        dispatchToDo(todoAction);
        handleDispatch(action); // error here
    }

    return (
        <div className="add-todo-container">
            <input
                value={todo.title}
                onChange={(e) => handleUpdateTitle(e.target.value)}
            ></input>
            <input
                value={todo.description}
                onChange={(e) => handleUpdateDescription(e.target.value)}
            ></input>
            <div>
                <input
                    value={todo.due.getDay()}
                    onChange={(e) =>
                        handleUpdateDue("day", parseInt(e.target.value))
                    }
                    type="number"
                ></input>
                <input
                    value={todo.due.getMonth()}
                    onChange={(e) =>
                        handleUpdateDue("month", parseInt(e.target.value))
                    }
                    type="number"
                ></input>
                <input
                    value={todo.due.getHours()}
                    onChange={(e) =>
                        handleUpdateDue("hours", parseInt(e.target.value))
                    }
                    type="number"
                ></input>
                <input
                    value={todo.due.getMinutes()}
                    onChange={(e) =>
                        handleUpdateDue("minutes", parseInt(e.target.value))
                    }
                    type="number"
                ></input>
            </div>
            <button onClick={() => handleSaveTodo()}>save</button>
        </div>
    );
}
