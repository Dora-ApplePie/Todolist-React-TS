import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from './Input.module.css'

type propsType = {
    addTask: (title: string, todoID: string) => void
    todolistsID: string
}

export const Input = (props:propsType) => {

    const [newInputValue, setNewInputValue] = useState('') //локальный стейт для инпута
    const [error, setError] = useState<string | null>(null)

    //------------------функции обработчики для TL--------------
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewInputValue(e.currentTarget.value) //отрисовываем полученое из инпута тек значение, каренттаргет - объ с которым произошло событие
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        setError(null) // !!!!!если кнопки нажимаются то ерор = нал и при вводе исчезает красное

        if (e.key === 'Enter') { //если было нажатие интер на инпут то
            addTaskListener();
        }
    }
    const addTaskListener = () => {
        if (newInputValue.trim() !== '') {
            props.addTask(newInputValue.trim(), props.todolistsID)//выполняется функция добавления новой таски
            setNewInputValue('') //возращение пустого инпута после добавления таски в TL
        } else {
            setError('Title is required')
        }
    }
    //--------------------------- зе енд обработчики TL ----------------
    return (
        <div>
            <input
                value={newInputValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ""}
            />
            <button onClick={addTaskListener}>+</button>
            {error && <div className={'error-msg'}>{error}</div>}
        </div>
    )
}