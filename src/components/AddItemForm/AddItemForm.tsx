import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {errorType} from "../../Todolist";
import styles from './AddItemForm.module.css'
import {ButtonClick} from "../ButtonClick/ButtonClick";


type propsType = {
    callback: (title: string) => void
}

export const AddItemForm = (props: propsType) => {

    const [newInputValue, setNewInputValue] = useState('') //локальный стейт для инпута - flux с AddItemForm
    const [error, setError] = useState<errorType>(null)

    const addTaskHandler = () => {
        if (newInputValue.trim() !== "") {
            props.callback(newInputValue)
            setNewInputValue('') //очистка поля инпута
        } else {
            setError('This title is required!')
        }
    }
    //------------------функции обработчики для TL--------------
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewInputValue(e.currentTarget.value) //отрисовываем полученое из инпута тек значение, каренттаргет - объ с которым произошло событие

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        setError('') // !!!!!если кнопки нажимаются то ерор = нал и при вводе исчезает красное

        if (e.key === 'Enter' && newInputValue.trim() !== '') { //если было нажатие интер на инпут то
            props.callback(newInputValue);
            setNewInputValue('')
        }
        if (e.key === 'Enter' && newInputValue.trim() === '') {
            setError('This title is required!')
        }
    }
    //--------------------------- зе енд обработчики TL ----------------
    return (
        <div>
            <input
                value={newInputValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? styles.Error : ''}
            />
            {error && <div className={styles.ErrorMsg}>{error}</div>}
            <ButtonClick name={'+'} callback={addTaskHandler}/>
        </div>
    )
}