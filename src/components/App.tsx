import { useEffect } from "react";
import "./App.css";
import { ToDo } from "./Todo";
import { ToDoData } from "./ToDoData";
import { useImmerReducer } from "use-immer";
import { Action, reducer } from "./reducer";
import { getData } from "./serverUtils";
import { handleDispatch } from "./handleDispatch";
import { Header } from "./Header";

function App() {
    const initialData: ToDoData[] = [];

    const [data, dataDispatch] = useImmerReducer(reducer, initialData);
    const dispatchHandler = handleDispatch(dataDispatch);

    useEffect(() => {
        const fetchData = async () => {
            console.log("fetching");
            // const fetchedToDos = await axios.get<ToDoData[]>("https://todo-app-lgse.onrender.com/todos").then(response => response.data)
            const fetchedToDos = await getData();
            console.log(fetchedToDos);
            fetchedToDos.forEach((aToDo) =>
                dataDispatch({ type: "add", id: aToDo.id, value: aToDo })
            );
            console.log("fetched");
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (data.length === 0) {
        return (
            <div className="App">
                <Header dispatch={dataDispatch} />
                <div className="loading-container">
                    <h2>loading data</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <Header dispatch={dataDispatch} />
            <div className="todo-list">
                {data.map((data: ToDoData) => (
                    <ToDo
                        key={data.id}
                        todo={data}
                        dispatch={(action: Action) => dispatchHandler(action)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
