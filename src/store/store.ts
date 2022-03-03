import {combineReducers, createStore} from "redux";
import {TodolistReducer} from "../reducers/TodolistReducer";
import {TaskReducer} from "../reducers/TaskReducer";


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
let rootReducer = combineReducers(
    {
        todolists: TodolistReducer,
        tasks: TaskReducer,
    }
)  //возвращает функцию

// непосредственно создаём store - объект
export  let  store = createStore(rootReducer)
// определить автоматически тип всего объекта состояния
export type rootReducersType = ReturnType<typeof rootReducer>

// @ts-ignore window.store=store
//Затем, в любой необходимой компоненте:
// console.log(store.getState())

