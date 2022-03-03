import React from 'react';
import './App.css';
import {PropsTask, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    updTodolistTitleAC
} from "./reducers/TodolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducersType} from "./store/store";
import {addTaskTaskAC, changeCheckedAC, removeTaskAC, updTaskAC} from "./reducers/TaskReducer";


export type filterType = 'all' | 'active' | 'completed' //создаем 3 названия фильтров которые могут быть

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string,
    title: string,
    filter: filterType
}

export type TaskTypes = {
    [key: string]: Array<PropsTask>
}

function App() {

    let dispatch = useDispatch();
    let todolists = useSelector<rootReducersType, TodolistType[]>(state => state.todolists);
    let tasks = useSelector<rootReducersType, TaskTypes>(tasks => tasks.tasks);

    // -----TODOLIST-----

    const removeTodolist = (todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))
    }

    function updTitle(title: string, todolistId: string) {
        dispatch(updTodolistTitleAC(title, todolistId))
    }

    function addNewTodoList(title: string) {
        dispatch(addTodolistAC(title))
    }

    function changeFilter(filter: filterType, todoID: string) {
        dispatch(changeFilterAC(filter, todoID))
    }


    // -----TASKS-----

    function addTask(title: string, todoID: string) {
        dispatch(addTaskTaskAC(title, todoID))
        //setTasks({...tasks, [todoID]: [{id: v1(), title: title.trim(), isDone: false}, ...tasks[todoID]]})
        //высыпаем яблоки в мешок, затем заходим в матрешку и указываем что там опять высыпаем яблоки но уже подробнее и там плюс добавляем новое яблоко
        // setTasks([NewTask, ...tasks]) // отрисовка новая таска плюс все таски из массива с помощью рест ...
    }

    function deleteTask(idTask: string, todoID: string) {
        dispatch(removeTaskAC(idTask, todoID))
        //setTasks({...tasks, [todoID]: tasks[todoID].filter(t => t.id !== idTask)})
    }
    //функция  удаления тасок, т.е. фильтр сравнения айди таски из наших тасок в стейте и айди на которой был нажат крестик
    //если значение фолс то произойдет перерисовка тасок

    function updTask(title: string, todolistId: string, taskId: string) {
        dispatch(updTaskAC(title, taskId, todolistId))
        // setTasks({
        //     ...tasks,
        //     [todolistId]: tasks[todolistId].map(todo => todo.id === taskId ? {...todo, title: title} : todo)
        // })
    }

    function changeChecked(idTask: string, isDone: boolean, todoID: string) {
        dispatch(changeCheckedAC(isDone, idTask, todoID))
        //setTasks({...tasks, [todoID]: tasks[todoID].map(t => t.id === idTask ? {...t, isDone: isDone} : t)})
        // let task = tasks.find(t => t.id === idTask)
        // if (task) { //тайпскрипт говорит а вдруг вы передадите айдишку которую хрен найдешь поэтому мы должны проверить существует ли она(псевдо истина псевдо ложь)
        //     task.isDone = isDone //меняем у таски исдон на который передаем в ончендж
        // }
        // setTasks([...tasks]) //отрисовка через деструктуризация - отрисуй которые поменялись
    }

    return (
        <div>
            <AppBar position="static" color={'secondary'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div">
                        TODOLIST APP
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callback={addNewTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl, index) => {

                            let FilteredTasksForToDo = tasks[tl.id]; // переменная с тасками для последющей фильтрации тасок

                            if (tl.filter === 'active') {
                                FilteredTasksForToDo = tasks[tl.id].filter(t => !t.isDone) //условие  для показа тасок у которых исдон не равыно тру
                            }
                            if (tl.filter === 'completed') {
                                FilteredTasksForToDo = tasks[tl.id].filter(t => t.isDone) //условие для показа тасок у которых исдон равно тру
                            }
                            return (
                                <Grid item>
                                    <Paper>
                                        <Todolist
                                            key={tl.id}
                                            todolistsID={tl.id}
                                            removeTodolist={removeTodolist}
                                            title={tl.title}
                                            tasks={FilteredTasksForToDo} //передаем таски после фильтрации
                                            deleteTask={deleteTask}
                                            addTask={addTask}
                                            changeFilter={changeFilter}
                                            changeChecked={changeChecked}
                                            filter={tl.filter}
                                            updTask={updTask}
                                            updTitle={updTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
