import React, {ChangeEvent, useState} from "react";

export type Props = {
    title: string
    callback: (title: string) => void
}
export const EditableSpan = (props: Props) => {
    let [edit, setEdit] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)

    const activateSpan = () => {
        setEdit(true)
    }

    const deactivateSpan = () => {
        setEdit(false)
        props.callback(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        edit
            ? <input onBlur={deactivateSpan} value={title} onChange={onChangeHandler} autoFocus/>
            : <span onDoubleClick={activateSpan}>{props.title}</span>

    )

}