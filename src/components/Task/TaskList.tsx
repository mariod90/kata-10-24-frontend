import React from 'react';
import {ITask} from "../../models/ITask";

interface TaskListProps {
    tasks: ITask[];
    onDeleteTask: (id: number) => void;
    onEditTask: (task: ITask) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onEditTask }) => {
    return (
        <div>
            {tasks.map((task: ITask) => (
                <li key={task.id} className="task-item">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <div className="options-task">
                        <button onClick={() => onEditTask(task)}>Edit</button>
                        <button onClick={() => onDeleteTask(task.id as number)}>Delete</button>
                    </div>
                </li>
            ))}
        </div>
    );
};
