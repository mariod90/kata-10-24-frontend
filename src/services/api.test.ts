import axios from 'axios';
import { fetchTasks, createTask, deleteTask } from './api';
import { ITask } from '../models/ITask';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedHeadersExpect = {"headers": {"Authorization": "mysecrettoken"}};
describe('API Service', () => {
    const mockTasks: ITask[] = [
        { id: 1, title: 'Task 1', description: 'Description 1' },
        { id: 2, title: 'Task 2', description: 'Description 2' }
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetchTasks should return tasks', async () => {
        mockedAxios.get.mockResolvedValue({ data: mockTasks });

        const tasks = await fetchTasks();

        expect(tasks).toEqual(mockTasks);
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);
        expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3001/tasks', mockedHeadersExpect);
    });

    test('createTask should create a new task', async () => {
        const newTask = { title: 'New Task', description: 'New Description' };
        const createdTask = { id: 3, ...newTask };

        mockedAxios.post.mockResolvedValue({ data: createdTask });

        const result = await createTask(newTask);

        expect(result).toEqual(createdTask);
        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3001/tasks', newTask, mockedHeadersExpect);
    });

    test('deleteTask should delete a task by id', async () => {
        mockedAxios.delete.mockResolvedValue({ status: 200 });

        await deleteTask(1);

        expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
        expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:3001/tasks/1', mockedHeadersExpect);
    });
});
