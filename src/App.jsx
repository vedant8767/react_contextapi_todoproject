import { useState } from 'react'
import './App.css'
import { TodoProvider } from './context'
import { useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  const [todos,setTodo] = useState([])

  const addTodo = (todo)=>{
    setTodo((prev)=> [{id:Date.now(),...todo},...prev])
  }

  const updateTodo = (id,todo)=>{
      setTodo((prev)=> prev.map((prevTodo)=>(
        prevTodo.id==id ?todo:prevTodo
      )))
  }

  const deleteTodo = (id)=>{
    setTodo((prev)=>prev.filter((todo)=>todo.id!=id))
  }

  const toggleTodo = (id)=>{
    setTodo((prev)=> prev.map((prevTodo)=>(
      prevTodo.id === id ? {...prevTodo,completed:!prevTodo.completed,} : prevTodo
    )))
  }

  useEffect(()=>{

    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length >0){
      setTodo(todos)
    }
  
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])


  return (
      <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleTodo}}>
        <h3 className='mb-3'>Todo Application</h3>
        <TodoForm/>
        {todos.map((todo)=>(
            <div className='flex items-center justify-center' key={todo.id}>
                <TodoItem todo={todo}></TodoItem>
            </div>
        ))}
      </TodoProvider>
 
  )
}

export default App
