import {TaskTypes, TodolistType} from "../App";
import {addTodolistAC, TodolistReducer} from "./TodolistReducer";
import {TaskReducer} from "./TaskReducer";

test('ids should be equals', () => {
    const startTasksState: TaskTypes = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
    const startTodolistsState: Array<TodolistType> = [
        {id: 'todolistId1', title: "What to learn", filter: "all"},
        {id: 'todolistId2', title: "What to buy", filter: "all"}
    ];

    const action = addTodolistAC("new todolist");

    const endTasksState = TaskReducer(startTasksState, action)
    const endTodolistsState = TodolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys.find(k => k != "todolistId1" && k != "todolistId2")
    const idFromTodolists = endTodolistsState[2].id;

    expect(idFromTasks).toBe(action.payload.todolistId);
    expect(idFromTodolists).toBe(action.payload.todolistId);
});
