import { useEffect } from "react";
import "./styles/App.css";
import "./styles/header.css";
import "./styles/todos.css";
import "./styles/new-todo.css";
import { ToDo } from "./Todo";
import { ToDoData } from "../core/ToDoData";
import { useImmerReducer } from "use-immer";
import { Action, reducer } from "../core/reducer";
import { getData } from "../core/serverUtils";
import { dispatchHandler } from "../core/dispatchHandler";
import { Header } from "./header_components/Header";

function App() {
    const initialData: ToDoData[] = [];

    const [data, dataDispatch] = useImmerReducer(reducer, initialData);
    const handleDispatch = dispatchHandler(dataDispatch);

    useEffect(() => {
        const fetchData = async () => {
            // const fetchedToDos = await axios.get<ToDoData[]>("https://todo-app-lgse.onrender.com/todos").then(response => response.data)
            const fetchedToDos = await getData();
            fetchedToDos.forEach((aToDo) =>
                handleDispatch({ type: "add", id: aToDo.id, value: aToDo })
            );
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (data.length === 0) {
        return (
            <div className="App">
                <Header handleDispatch={handleDispatch} />
                <div className="loading-container">
                    <h2>loading data</h2>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header handleDispatch={handleDispatch} />
            <main className="App">
                <div className="todo-list">
                    {data.map((data: ToDoData) => (
                        <ToDo
                            key={data.id}
                            todo={data}
                            handleDispatch={(action: Action) =>
                                handleDispatch(action)
                            }
                        />
                    ))}
                </div>
            </main>
            <footer>
                <p>
                    Check out the github repository for the front-end{" "}
                    <a href="https://github.com/henrypgill/todo-app">here</a>
                </p>
                <p>
                    Check out the github repository for the back-end{" "}
                    <a href="https://github.com/henrypgill/todo-app-server">
                        here
                    </a>
                </p>
            </footer>
        </>
    );
}

export default App;
