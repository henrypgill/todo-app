import { Action } from "./reducer";
import { emptyToDo } from "./utils";

interface HeaderProps {
    dispatch(action: Action): void;
}

export function Header({ dispatch }: HeaderProps): JSX.Element {
    function handleCreatedSort() {
        const action: Action = {
            id: -1,
            type: "sort-created",
            value: emptyToDo(),
        };
        dispatch(action);
    }
    function handleDueSort() {
        const action: Action = {
            id: -1,
            type: "sort-due",
            value: emptyToDo(),
        };
        dispatch(action);
    }
    function handleStatusSort() {
        const action: Action = {
            id: -1,
            type: "sort-status",
            value: emptyToDo(),
        };
        dispatch(action);
    }
    function handleIDSort() {
        const action: Action = {
            id: -1,
            type: "sort-id",
            value: emptyToDo(),
        };
        dispatch(action);
    }

    return (
        <header>
            <h1>To-Do App</h1>
            <h2>Instructions</h2>
            <ul>
                <li>
                    double click on a To-Do's title or description to edit it
                </li>
                <li>
                    use the mark as complete/incomplete buttons to change the
                    status of the To-Do
                </li>
                <li>
                    use the +/- toggle button to show or hide an individual
                    To-Do
                </li>
                <li>use the sort buttons to sort and filter all your todos</li>
            </ul>
            <button onClick={handleCreatedSort}>sort by created date</button>
            <button onClick={handleDueSort}>sort by due date</button>
            <button onClick={handleStatusSort}>sort by status</button>
            <button onClick={handleIDSort}>sort by number</button>
        </header>
    );
}
