import React, { useState, useEffect, ChangeEvent } from 'react';
import api from '../../services/api';
import { finished } from 'stream';

interface ITask{
    id: number;
    title: string;
    finished: boolean;
}

const Tasks: React.FC = () => {
// GET
    const [tasks, setTasks] = useState<ITask[]>([])
    useEffect(() => {
        loadTasks()
    }, [])
    async function loadTasks() {
        const response = await api.get('/tasks')

        setTasks(response.data);
    }

// POST
    const [task, setTask] = useState('');
    const [listTask, setListTask] = useState<any>({
        title: '',
        finished: false
    })

    const addTask = async () =>{
        if(!task) return alert('Preencha uma tarefa')

        const newTask = {
            title: task,
            finished: false
        }
        
        await api.post('/tasks', newTask)

        await loadTasks()
        
    }

// Delete

    const removeTask = async (id: any) =>{
        await api.delete(`/tasks/${id}`)

        await loadTasks()
    }

//Finished

    const toggleChecked = async (id: number) => {
        await api.patch(`/tasks/${id}`)
        
        loadTasks()
    }

    return (
    <div className='container'>
        <h1 className='title'>TODO LIST</h1>
        <div className='spacer'></div>
        <div className='flex'>
            <input placeholder="Digite sua tarefa" onChange={(e)=> setTask(e.target.value)}/>
            <button className='principal-button' onClick={addTask}>Adicionar</button>
        </div>
        <div className='spacer'></div>
        <ul>
            {   
                tasks.map(task => (
                <li key={task.id}>
                    <p  className={task.finished ? 'line-with-through' : 'line-without-through'}>{task.title}</p>
                    <div className='flex'>
                        <button className='items-button' onClick={() => toggleChecked(task.id)}>
                            <i className='bx bx-check' ></i>
                        </button>
                        <button className='items-button' onClick={() => removeTask(task.id)}>
                            <i className='bx bx-trash'></i>
                        </button>
                    </div>
                </li>
                ))
            }
            
        </ul>
    </div>
    )
}

export default Tasks;