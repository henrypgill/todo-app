import { useEffect, useState } from "react";
import { ToDoData } from "./ToDoData";
import { useImmerReducer } from "use-immer";
import { Action } from "./reducer";
import { getNextServerTodoID } from "./serverUtils";
import { DatePicker, DatePickerDate } from "./DatePicker";

interface NewToDoProps {
    handleDispatch(action: Action): void;
}

interface ToDoAction {
    field: keyof ToDoData | "reset";
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
    const [date, setDate] = useState<DatePickerDate>([1, 1, 0, 0]);

    function todoReducer(draftTodo: ToDoData, todoAction: ToDoAction) {
        switch (todoAction.field) {
            case "title":
                draftTodo.title = todoAction.value.title;
                break;
            case "description":
                draftTodo.description = todoAction.value.description;
                break;
            case "due":
                draftTodo.due = todoAction.value.due;
                break;
            case "id":
                draftTodo.id = todoAction.value.id;
                break;
            case "reset":
                draftTodo = initialNewToDo;
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

    function handleSaveTodo() {
        const newTodoDue = new Date(2023, ...date);
        const todoAction: ToDoAction = {
            field: "id",
            value: { ...todo, id: todo.id + 1, due: newTodoDue },
        };
        console.log(todoAction.value.due.getMonth());
        console.log(todoAction.value.due.getDate());
        console.log(todoAction.value.due.getHours());
        console.log(todoAction.value.due.getMinutes());
        const action: Action = {
            id: todo.id,
            type: "new-todo",
            value: { ...todo, id: todo.id + 1, due: newTodoDue },
        };
        dispatchToDo(todoAction);
        handleDispatch(action); // error here
    }

    return (
        <div className="new-todo-container">
            <h3 className="new-todo-title-label">Title:</h3>
            <input
                className="new-todo-title-input"
                value={todo.title}
                onChange={(e) => handleUpdateTitle(e.target.value)}
            ></input>
            <h3 className="new-todo-description-label">Description:</h3>
            <input
                className="new-todo-description-input"
                value={todo.description}
                onChange={(e) => handleUpdateDescription(e.target.value)}
            ></input>
            <DatePicker date={date} setDate={setDate} />
            <button
                onClick={() => handleSaveTodo()}
                className="new-todo-save-button"
            >
                save
            </button>
        </div>
    );
}
/*
            <h3 className="new-todo-date-label">Date:</h3>
            <input
                className="new-todo-day-input"
                value={todo.due.getDate()}
                onChange={(e) =>
                    handleUpdateDue("day", parseInt(e.target.value))
                }
            ></input>
            <input
                className="new-todo-month-input"
                value={todo.due.getMonth()}
                onChange={(e) =>
                    handleUpdateDue("month", parseInt(e.target.value))
                }
            ></input>
            <h3 className="new-todo-time-label">Time:</h3>
            <input
                className="new-todo-hour-input"
                value={todo.due.getHours()}
                onChange={(e) =>
                    handleUpdateDue("hours", parseInt(e.target.value))
                }
            ></input>
            <input
                className="new-todo-minute-input"
                value={todo.due.getMinutes()}
                onChange={(e) =>
                    handleUpdateDue("minutes", parseInt(e.target.value))
                }
            ></input>
        </div>
    );
}
*/
