// @ts-ignore window.store=store
//Затем, в любой необходимой компоненте:
// console.log(store.getState())

import {combineReducers, createStore} from "redux";
import {TodolistReducer} from "../reducers/TodolistReducer";

let rootReducer = combineReducers(
    {
        todolists: TodolistReducer
    }
)

export type rootReducersType = ReturnType<typeof rootReducer>

export  let  store = createStore(rootReducer)

