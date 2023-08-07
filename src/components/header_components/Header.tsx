import { NewToDo } from "./NewToDo";
import { Action } from "../../core/reducer";
import { emptyToDo } from "../utils";

interface HeaderProps {
    handleDispatch(action: Action): void;
}

export function Header({ handleDispatch }: HeaderProps): JSX.Element {
    function handleCreatedSort() {
        const action: Action = {
            id: -1,
            type: "sort-created",
            value: emptyToDo(),
        };
        handleDispatch(action);
    }
    function handleDueSort() {
        const action: Action = {
            id: -1,
            type: "sort-due",
            value: emptyToDo(),
        };
        handleDispatch(action);
    }
    function handleStatusSort() {
        const action: Action = {
            id: -1,
            type: "sort-status",
            value: emptyToDo(),
        };
        handleDispatch(action);
    }
    function handleIDSort() {
        const action: Action = {
            id: -1,
            type: "sort-id",
            value: emptyToDo(),
        };
        handleDispatch(action);
    }

    return (
        <header className="header-container">
            <div className="header-text-container">
                <h1>To-Do App</h1>
                <h2>Instructions</h2>
                <ul>
                    <li>
                        double click on a To-Do's title or description to edit
                        it
                    </li>
                    <li>
                        use the mark as complete/incomplete buttons to change
                        the status of the To-Do
                    </li>
                    <li>
                        use the +/- toggle button to show or hide an individual
                        To-Do
                    </li>
                    <li>
                        use the sort buttons to sort and filter all your todos
                    </li>
                    <li>
                        double click on the completed status to toggle a To-Do
                        between complete and incomplete
                    </li>
                </ul>
            </div>
            <NewToDo handleDispatch={handleDispatch} />
            <div className="header-buttons-container">
                <h3>Sort by:</h3>
                <button onClick={handleCreatedSort} className="sort-button">
                    created date
                </button>
                <button onClick={handleDueSort} className="sort-button">
                    due date
                </button>
                <button onClick={handleStatusSort} className="sort-button">
                    status
                </button>
                <button onClick={handleIDSort} className="sort-button">
                    number
                </button>
            </div>
        </header>
    );
}
