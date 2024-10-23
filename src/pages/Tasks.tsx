import React, {useEffect, useState} from 'react';
import { TaskList } from '../components/Task/TaskList';
import { TaskForm } from '../components/Task/TaskForm';
import { useAuth } from '../context/AuthContext';
import {ITask} from "../models/ITask";
import {createTask, deleteTask, fetchTasks, updateTask} from "../services/api";
import {getErrorAxios} from "../utilities/handleError";

const Tasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const tasksFromApi = await fetchTasks();
                setTasks(tasksFromApi);
            } catch (error: any) {
                setError(getErrorAxios(error))
            }
        })()
    }, []);

    useEffect(() => {
        setError(null);
    }, [tasks, taskToEdit]);

    const handleCreateTask = async (newTask: ITask) => {
        try {
            const createdTask = await createTask(newTask);
            setTasks((prevTasks) => [...prevTasks, createdTask]);
        } catch (error: any) {
            setError(getErrorAxios(error))
        }
    };

    const handleUpdateTask = async (updatedTask: ITask) => {
        try {
            const task = await updateTask(updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === task.id ? task : t))
            );
            setTaskToEdit(null);
        } catch (error: any) {
            setError(getErrorAxios(error))
        }
    };

    const handleDeleteTask = async (id: number) => {
        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error: any) {
            setError(getErrorAxios(error))
        }
    };

    const handleEditTask = (task: ITask) => {
        setTaskToEdit(task);
    };

    return (
        <div className="task-page">
            <h1>Task Manager</h1>
            {error && <div className='error'>{error}</div>}
            <button onClick={logout}>Logout</button>
            <TaskForm
                onCreateTask={handleCreateTask}
                onUpdateTask={handleUpdateTask}
                taskToEdit={taskToEdit}
            />

            <TaskList
                tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
            />
        </div>
    );
};

export default Tasks;
