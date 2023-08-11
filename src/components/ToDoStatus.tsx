import { ToDoData } from "../core/ToDoData";
import { Action } from "../core/reducer";

interface CompleteButtonProps {
    todo: ToDoData;
    handleDispatch(action: Action): void;
}

export function ToDoStatus({ todo, handleDispatch }: CompleteButtonProps) {
    function handleComplete() {
        const action: Action = {
            id: todo.id,
            type: "complete",
            value: { ...todo, status: true },
        };
        handleDispatch(action);
    }
    function handleIncomplete() {
        const action: Action = {
            id: todo.id,
            type: "incomplete",
            value: { ...todo, status: false },
        };
        handleDispatch(action);
    }

    function handleOnClick() {
        if (todo.status) {
            handleIncomplete();
        } else if (!todo.status) {
            handleComplete();
        }
    }

    return (
        <h4 className="todo-status" onDoubleClick={handleOnClick}>
            {todo.status ? "complete" : "incomplete"}
        </h4>

        //     {todo.status === "incomplete" ? (
        //     <button
        //         onClick={handleComplete}
        //         className="todo-button"
        //     >
        //         mark as complete
        //     </button>
        // ) : (
        //     <button
        //         onClick={handleIncomplete}
        //         className="todo-button"
        //     >
        //         mark as incomplete
        //     </button>
        // )}
    );
}
