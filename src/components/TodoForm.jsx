import React, { useState } from 'react'
import { useTodo } from '../context'

export default function TodoForm(){

    const {todos,addTodo} = useTodo()

    const [todo,setTodo] = useState("")

    const add = (e)=>{
        e.preventDefault()
        
        if(!todo) return

        addTodo({todo,completed:false})
        setTodo("")
        console.log(todos)
    }

    return(
        <div className='flex justify-center gap-12'>
            <form onSubmit={add}>
                <input 
                className='p-2 bg-transparent bg-slate-300 text-black w-96'
                type="text" placeholder='Write Todo...'
                 value={todo}
                 onChange={(e)=>setTodo(e.target.value)} />
                <button className='ml-5 p-2 w-14 rounded-md bg-green-400' type="submit">Add</button>
            </form>
        </div>
    )
}