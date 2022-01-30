import {TaskTypes} from "../App";


export const TaskReducer = (state: TaskTypes, action: tsarType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state
        }
        case 'ADD-TASK': {
            return state
        }
        case 'UPD-TASK': {
            return state
        }
        case 'CHANGE-CHECKED': {
            return state
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

type tsarType = removeTaskACType | addTaskTaskACType | updTaskACType | changeCheckedACType
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

