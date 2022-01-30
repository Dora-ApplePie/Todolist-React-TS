import {filterType, TodolistType} from "../App";
import {v1} from "uuid";

export const TodolistReducer = (state: Array<TodolistType>, action: mainType): Array<TodolistType> => {
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
            return [...state, {id: v1(), title: action.payload.title, filter: 'all' as filterType}]
            // let newID = v1()
            // setTodolists([{id: newID, title: title, filter: 'all'},...todolists])
            // setTasks({...tasks, [newID]:[]})
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
            throw new Error("I don't understand this action type")
    }
}

type mainType = removeTodolistACType | changeTodolistTitleACType | addTodolistACType | changeFilterACType
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof updTodolistTitleAC>
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
        payload: {title}
    } as const
}

export const changeFilterAC = (filter: string, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {filter, id}
    } as const
}