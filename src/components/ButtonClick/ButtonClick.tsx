import React from 'react'
import {filterType} from "../../App";
import styles from './ButtonClick.module.css'

type PropsType = {
    name?: string
    callback: () => void
    filter?: filterType
}

export const ButtonClick = (props: PropsType) => {
    const onClickHandler = () => {
        props.callback()
    }
    return (
        <span>
            <button className={props.filter === props.name ? styles.activeFilter : ''}
                    onClick={onClickHandler}>{props.name}</button>
        </span>

    )
}