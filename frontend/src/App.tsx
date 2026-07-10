import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { MdModeEditOutline, MdOutlineDone} from "react-icons/md"
import { FaTrash } from "react-icons/fa6";

interface ToDo {
  todo_id: number;
  description: string,
  completed: boolean
}

function App() {

  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState<ToDo[]>([]);
  const [editTodo, setEditTodo] = useState<ToDo | null>(null);
  const [editedText, setEditedText] = useState("");

  const getTodos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/all");
      setTodo(Array.isArray(res.data) ? res.data : []);
      console.log(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)){
        console.error(err.message);
      } else if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/todo",
        {
          description,
          completed: false,
        });

        setDescription("");
        getTodos();

    } catch (err: unknown) {
      if(axios.isAxiosError(err)){
        console.error(err.message);
      } else if (err instanceof Error){
        console.error(err.message)
      } else{
        console.error("Unexpected error", err);
      }
    }
  };

  const toggleCompleted = async (todo: ToDo) => {
    try {
      const updatedTodo = {
        description: todo.description,
        completed: !todo.completed,
      };

      await axios.put(`http://localhost:3000/${todo.todo_id}`, updatedTodo);
      getTodos();
    } catch (err: unknown) {
      if(axios.isAxiosError(err)){
        console.error(err.message);
      }else if (err instanceof Error){
        console.error(err.message);
      } else {
        console.error("Unexpected error", err);
      }
    }
  };

  const deleteTodo = async(todo : ToDo) => {
    try {
      await axios.delete(`http://localhost:3000/${todo.todo_id}`);
      getTodos();
    } catch (err: unknown) {
      if(axios.isAxiosError(err)){
        console.error(err.message);
      } else if (err instanceof Error){
        console.error(err.message);
      } else{
        console.error("Unexpected error", err);
      }
    }
  };

  const startEdit = (todo : ToDo) => {
    setEditTodo(todo);
    setEditedText(todo.description);
  };

  return (
    <div className='min-h-screen bg-gray-800 flex justify-center items-center p-4 text-white'>
      <div className='bg-gray-50 rounded-2xl shadow-xl w-full max-w-lg p-8'>
        <h1 className='text-4xl font-bold text-gray-800 pb-4'>ToDo App</h1>
        <form 
          onSubmit={onSubmitForm}
          className='flex items-center gap-2 shadow-sm border p-2 rounded-lg mb-6'>
          <input
            className='flex-1 outline-none px-3 py-2 text-gray-700 placeholder-gray-400'
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='What is the task to be done?'
            required
            >
          </input>
          <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer'>
            Add task
          </button>
        </form>
        <div className='text-black flex-col'>
          {todo.map((todo) => (
            <div key={todo.todo_id} className='flex w-full items-center gap-2 py-2'>
              <button 
                onClick={() => toggleCompleted(todo)}
                className={`h-6 w-6 border-2 rounded-full flex items-center justify-center ${todo.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-blue-400"}`}>
                {todo.completed && <MdOutlineDone size={16} />}
              </button>
              <span className='text-left flex-1'>{todo.description}</span>
              <div className='flex gap-4'>
                <button className='hover:text-blue-600'><MdModeEditOutline/></button>
                <button
                  onClick={() => deleteTodo(todo)}
                  className='hover:text-red-600'><FaTrash/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
