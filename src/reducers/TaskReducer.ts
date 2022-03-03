import {TaskTypes} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./TodolistReducer";


export let initialState: TaskTypes = {
    ["todolistsId1"]: [
        {id: v1(), title: 'HTML 5', isDone: true}, //0 объект
        {id: v1(), title: 'CSS 3', isDone: true}, //1 объект
        {id: v1(), title: 'TypeScript', isDone: true}, //2 объект
        {id: v1(), title: 'React', isDone: true}
    ],
    ["todolistsId2"]: [
        {id: v1(), title: 'Node.js', isDone: false},
        {id: v1(), title: 'Vue.js', isDone: false},
        {id: v1(), title: 'Redux', isDone: true},
        {id: v1(), title: 'Angular', isDone: false}
    ],
    ["todolistsId3"]: [
        {id: v1(), title: 'Vodka', isDone: true},
        {id: v1(), title: 'Whiskey', isDone: true},
        {id: v1(), title: 'Liquid', isDone: true},
        {id: v1(), title: 'Vodaaa', isDone: false}
    ]
}

export const TaskReducer = (state= initialState, action: tsarType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].filter(task => task.id !== action.payload.id)
            }
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todoID]: [newTask, ...state[action.payload.todoID]]
            }
        }
        case 'UPD-TASK': {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].map(task => task.id === action.payload.id ? {
                    ...task,
                    title: action.payload.title
                } : task)
            }
        }
        case 'CHANGE-CHECKED': {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].map(task => task.id === action.payload.id ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.payload.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const {[action.payload.id]: [], ...rest} = {...state}//деструктурируем объект стейт на свойства а в другой объект отдаем оставшиеся св-ва
            return rest
        }
        default:
            return state

    }
}

type tsarType = removeTaskACType | addTaskTaskACType | updTaskACType | changeCheckedACType | addTodolistACType | removeTodolistACType
type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskTaskACType = ReturnType<typeof addTaskTaskAC>
type updTaskACType = ReturnType<typeof updTaskAC>
type changeCheckedACType = ReturnType<typeof changeCheckedAC>

export const removeTaskAC = (id: string, todoID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id,
            todoID: todoID
        }
    } as const
}

export const addTaskTaskAC = (title: string, todoID: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title,
            todoID: todoID
        }
    } as const
}

export const updTaskAC = (title: string, id: string, todoID: string) => {
    return {
        type: 'UPD-TASK',
        payload: {
            title: title,
            id: id,
            todoID: todoID
        }
    } as const
}

export const changeCheckedAC = (isDone: boolean, id: string, todoID: string) => {
    return {
        type: 'CHANGE-CHECKED',
        payload: {
            isDone: isDone,
            id: id,
            todoID: todoID
        }
    } as const
}

