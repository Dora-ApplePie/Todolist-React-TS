import {filterType, TodolistType} from "../App";
import {v1} from "uuid";

export const TodolistReducer = (state: Array<TodolistType>, action: mainType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let newState = [...state]
            return newState.filter(tl => tl.id != action.payload.id)
        }
        case "CHANGE-TODOLIST-TITLE": {
            let newState = [...state]
            return newState.map(tl => tl.id === action.payload.id  ? {...tl, title: action.payload.title} : tl)
        }
        case 'ADD-TODOLIST' : {
            return [...state, {id: v1(), title: action.payload.title, filter: 'all' as filterType}]
        }
        case "CHANGE-TODOLIST-FILTER":{
            let newState = [...state]
            return newState.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter as filterType} : tl)
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

type mainType = removeTodolistACType | changeTodolistTitleACType | addTodolistACType | changeFilterACType
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: id
        }
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: id,
            title: title
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title}
    } as const
}
export const changeFilterAC = (filter: string, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {filter, id}
    } as const
}