import {  useReducer } from "react"
import React from 'react';


export interface Sub {
    nick: string
    subMonths: number
    avatar: string
    description?: string
}
interface FormState {
    inputValues: Sub
}

interface FormProps {
    //onNewSub: React.Dispatch<React.SetStateAction<Sub[]>>
    onNewSub: (newSub: Sub) => void
}

const INITIAL_STATE = {
    nick: "",
    subMonths: 0,
    avatar: "",
    description: ""
}

type FormReducerAction = {

    type: "change_value",
    payload: {
        inputName: string,
        inputValue: string
    }
} | {
    type: "clear"
}

const formReducer = (state: FormState["inputValues"], action: FormReducerAction) => {
switch (action.type) {
    case "change_value":
        const {inputName, inputValue} = action.payload
        return {
            ...state,
            [inputName]: inputValue
        }
    case "clear":
        return INITIAL_STATE
    default:
        return state
}

}

const Form = ({ onNewSub }: FormProps) => {

   // const [inputValues, setInputValues] = useState<FormState["inputValues"]>(INITIAL_STATE)

    const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onNewSub(inputValues)
        dispatch({type: "clear"}) //handleClear()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
       const {name, value} = event.target
        dispatch({
            type: "change_value",
            payload: {
                inputName: name,
                inputValue: value
            }
        })       
    }
    const handsleClear = () => {
        dispatch({type: "clear"})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={inputValues.nick} type="text" name='nick' placeholder='nick' />
                <input onChange={handleChange} value={inputValues.subMonths} type="text" name='subMonths' placeholder='subMonths' />
                <input onChange={handleChange} value={inputValues.avatar} type="text" name='avatar' placeholder='avatar' />
                <textarea onChange={handleChange} value={inputValues.description} name='description' placeholder='description' />
                <button type='submit'>Save</button>
                <button onClick={handsleClear} type='button'>Clear</button>
            </form>
        </div>
    )
}
export default Form