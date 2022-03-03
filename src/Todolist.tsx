import React, {ChangeEvent} from "react";
import './App.css';
import {filterType} from "./App";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import {Button} from "@material-ui/core";


export type PropsTasks = {
    title: string
    tasks: Array<PropsTask>
    deleteTask: (idTask: string, todoID: string) => void
    changeFilter: (filter: filterType, todoID: string) => void
    addTask: (title: string, todoID: string) => void
    changeChecked: (idTask: string, isDone: boolean, todoID: string) => void
    filter: filterType
    todolistsID: string
    removeTodolist: (todoListID: string) => void
    updTask: (title: string, todolistId: string, taskId: string) => void
    updTitle: (title: string, todolistId: string) => void
}

export type PropsTask = {
    id: string
    title: string
    isDone: boolean
}
export type errorType = string | null

export const Todolist: React.FC<PropsTasks> = React.memo((props) => {

    const removeTodo = () => {
        props.removeTodolist(props.todolistsID)
    }

    const tsarFooFunc = (FilterValue: filterType) => {
        props.changeFilter(FilterValue, props.todolistsID)
    }

    const addCallbackHandler = (title: string) => {
        props.updTitle(title, props.todolistsID)
    }

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} callback={addCallbackHandler}/>
                    {/*------!!!callback то же самое что и обработчик, например
                     const callbackUPDATE = (title: string) => {
                            props.updTitle(title, props.todolistsID)
                        }*/}
                    <IconButton onClick={removeTodo} aria-label="delete" size="small">
                        <Delete/>
                    </IconButton>
                    {/*<ButtonClick name={'X'} callback={removeTodo}/>*/}
                </h3>
                <div className={'both'}>
                    <AddItemForm callback={(title) => props.addTask(title, props.todolistsID)}/>
                </div>

                    {props.tasks.map((t, index) => {
                        const removeHandler = () => {
                            props.deleteTask(t.id, props.todolistsID)
                        }
                        const checkedTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeChecked(t.id, e.currentTarget.checked, props.todolistsID)
                        }
                        return <div className={t.isDone ? 'is-done' : ''}
                                   key={t.id}> {/*используем ключ, реакту важно знать что мы мапим/удаляем, надо связать объект с jsx*/}
                            <Checkbox onChange={checkedTaskHandler} checked={t.isDone}/>
                            {/*<input type="checkbox"*/}
                            {/*       onChange={checkedTaskHandler}*/}
                            {/*       checked={t.isDone}/>*/}
                            <EditableSpan title={t.title}
                                          callback={(title) => props.updTask(title, props.todolistsID, t.id)}/>
                            <IconButton onClick={removeHandler} aria-label="delete" size="small">
                                <Delete/>
                            </IconButton>
                            {/*<ButtonClick name={'x'} callback={removeHandler}/>*/}
                            {/*2-й способ "мостик", ремув хэндлер*/}
                        </div>;
                    })
                    }

                <div>
                    <Button variant={props.filter === 'all' ? "contained" : "outlined"} color="secondary" onClick={() => tsarFooFunc('all')}>All</Button>
                    {/*царь принимает разные значения, если мы снизу передаем что-то то надо прописать анонимную функцию ()=> для 2х вызовов*/}
                    <Button variant={props.filter === 'active' ? "contained" : "outlined"} color="secondary" onClick={() => tsarFooFunc('active')}>Active</Button>
                    <Button variant={props.filter === 'completed' ? "contained" : "outlined"} color="secondary" onClick={() => tsarFooFunc('completed')}>Completed</Button>
                </div>
            </div>
        </div>
    )
})

