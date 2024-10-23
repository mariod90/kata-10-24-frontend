import React, {useEffect, useState} from 'react';
import {ITask} from "../../models/ITask";

interface TaskFormProps {
    onCreateTask: (task: ITask) => void;
    onUpdateTask: (task: ITask) => void;
    taskToEdit: ITask | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask, onUpdateTask, taskToEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [taskToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const task: ITask = {
            id: taskToEdit ? taskToEdit.id : undefined,
            title,
            description,
        };

        if (taskToEdit) {
            onUpdateTask(task);
        } else {
            onCreateTask(task);
        }

        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <button type="submit">
                {taskToEdit ? 'Update Task' : 'Create Task'}
            </button>
        </form>
    );
};
