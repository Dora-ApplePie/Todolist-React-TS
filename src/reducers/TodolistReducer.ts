import {filterType, TodolistType} from "../App";
import {v1} from "uuid";

let todolistsId1 = v1();
let todolistsId2 = v1();
let todolistsId3 = v1();

export let initialState: Array<TodolistType> = [
    {id: todolistsId1, title: 'What to learn today', filter: 'all'},
    {id: todolistsId2, title: 'What to learn later', filter: 'all'},
    {id: todolistsId3, title: 'What to drink now', filter: 'all'}
]

export const TodolistReducer = (state: Array<TodolistType> = initialState, action: mainType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let newState = [...state]
            return newState.filter(tl => tl.id != action.payload.id)
            // удаление целого тудулиста
            // фильтрация - верни нам те туду листи, у которых  айди которое пришло не равно айди которое в стейте
        }
        case "CHANGE-TODOLIST-TITLE": {
            let newState = [...state]
            return newState.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
            //мап уже возращает массив
        }
        case 'ADD-TODOLIST' : {
            return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'all' as filterType}]
        }
        case "CHANGE-TODOLIST-FILTER": {
            let newState = [...state]
            return newState.map(tl => tl.id === action.payload.id ? {
                ...tl,
                filter: action.payload.filter as filterType
            } : tl)
            //map сам сделал массив и копию ... делать не надо
        }
        default:
            return state
    }
}

export type mainType = removeTodolistACType | changeTodolistTitleACType | addTodolistACType | changeFilterACType
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type changeTodolistTitleACType = ReturnType<typeof updTodolistTitleAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type changeFilterACType = ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: id
        }
    } as const
}

export const updTodolistTitleAC = (title: string, id: string) => {
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
        payload: {
            title: title,
            todolistId: v1()
        }
    } as const
}

export const changeFilterAC = (filter: string, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {filter, id}
    } as const
}