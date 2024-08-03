import { useTodo } from "../context"

import { useState } from "react"

export default function TodoItem({todo}){

    const {updateTodo,toggleTodo,deleteTodo} = useTodo()

    const [isTodoEditable,setTodoEditable] = useState(false)
    const [Todomsg,setTodomsg] = useState(todo.todo)

    const editTodo = ()=>{
        updateTodo(todo.id,{...todo,todo:Todomsg})
        setTodoEditable(false)
    }

    const togglecompleted = ()=>{
        toggleTodo(todo.id)
    }
    return(
        <div className={`flex justify-center align-middle gap-5 w-96 mt-5 py-2  text-black ${
            todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
        }`}>

            <input
            className="ml-2 cursor-pointer"
            type="checkbox" 
            checked={todo.completed}
            onChange={togglecompleted} />

            <input type="text"
            className={`rounded-sm outline-none bg-transparent text-black-800 
            ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} 
            ${todo.completed ? "line-through" : ""}`}
            value={Todomsg}
            onChange={(e)=>setTodomsg(e.target.value)}
            readOnly={!isTodoEditable} />
            
            <button
            disabled={todo.completed}
            onClick={()=>{
                if(todo.completed) return

                if(isTodoEditable){
                    editTodo()
                }
                else{
                    setTodoEditable((prev)=>!prev)
                }
            }}>
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            <button onClick={()=>deleteTodo(todo.id)}>❌</button>
        </div>
    )
}