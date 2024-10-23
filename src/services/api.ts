import axios from 'axios';
import {ITask} from "../models/ITask";

const API_URL = 'http://localhost:3001/tasks';

export const fetchTasks = async () => {
    const response = await axios.get(API_URL, {
        headers: { Authorization: 'mysecrettoken' },
    });
    return response.data;
};

export const createTask = async (task: ITask) => {
    const response = await axios.post(API_URL, task, {
        headers: { Authorization: 'mysecrettoken' },
    });
    return response.data;
};

export const updateTask = async (task: ITask): Promise<ITask> => {
    const response = await axios.put(`${API_URL}/${task.id}`, task, {
        headers: { Authorization: 'mysecrettoken' },
    });
    return response.data;
};

export const deleteTask = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: 'mysecrettoken' },
    });
};
