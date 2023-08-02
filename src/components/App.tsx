import {useEffect, useReducer} from "react"
import "./App.css";
import { ToDo, ToDoData } from "./Todo";
// import { produce } from "immer";
// import importData from "./data.json"
import axios from "axios";
// import {useImmerReducer} from "use-immer"


export interface Action {
    id: number;
    type: "complete" | "delete" | "update" | "add";
    value: ToDoData;
}

function App() {

    const initialData: ToDoData[] = []

    // const [data, dataDispatch] = useImmerReducer(reducer, initialData)
    const [data, dataDispatch] = useReducer(reducer, initialData)

    useEffect(()=> {
        const fetchData = async () => {
            console.log("fetching")
            const fetchedToDos = await axios.get<ToDoData[]>("http://localhost:5000/todos/").then(response => response.data)
            fetchedToDos.forEach((aToDo) => dataDispatch({type: "add", id: aToDo.id, value:aToDo}))
            console.log("fetched")
        }
        fetchData();
    }, [])



    function reducer(state: ToDoData[], action: Action): ToDoData[] {
        switch (action.type) {
            case "complete":
                return state.map(todo => todo.id !== action.id ? todo : {...todo, status: "complete"});
            case "delete":
                return state.filter(todo => todo.id !== action.id);
            case "update":
                return state.map(todo => todo.id !== action.id ? todo : action.value);
            case "add":
                if (state.find(stateToDo => stateToDo.id === action.id)) {
                    return state;
                }
                return [...state, action.value]
            default:
                return state
        }
    }

   
    if (data.length === 0) {
        return (
            <div className="App">
                <header>Your To-Dos</header>
                <div className="loading-container">
                    <h2>loading data</h2>
                </div>
            </div>
            
        )
    }

    return (
        <div className="App">
            <header>Your To-Dos</header>
            <div className="todo-list">
                {data.map((data: ToDoData) => <ToDo key={data.id} todo={data} dispatch={(action: Action) => dataDispatch(action)}/>)}
            </div>
        </div>
    );
}

export default App;
