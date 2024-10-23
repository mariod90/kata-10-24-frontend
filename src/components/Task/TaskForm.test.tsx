import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskForm } from './TaskForm';
import { ITask } from "../../models/ITask";

describe('TaskForm Component', () => {
    const onCreateTaskMock = jest.fn();
    const onUpdateTaskMock = jest.fn();

    test('renders form for creating a task', () => {
        render(<TaskForm onCreateTask={onCreateTaskMock} onUpdateTask={onUpdateTaskMock} taskToEdit={null} />);

        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
        fireEvent.click(screen.getByText('Create Task'));

        expect(onCreateTaskMock).toHaveBeenCalledWith({
            id: undefined,
            title: 'New Task',
            description: 'New Description',
        });
    });

    test('renders form for editing a task', () => {
        const taskToEdit: ITask = { id: 1, title: 'Existing Task', description: 'Existing Description' };

        render(<TaskForm onCreateTask={onCreateTaskMock} onUpdateTask={onUpdateTaskMock} taskToEdit={taskToEdit} />);

        //expect(screen.getByPlaceholderText('Title').value).toBe('Existing Task');
        //expect(screen.getByPlaceholderText('Description').value).toBe('Existing Description');

        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Task' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Updated Description' } });
        fireEvent.click(screen.getByText('Update Task'));

        expect(onUpdateTaskMock).toHaveBeenCalledWith({
            id: 1,
            title: 'Updated Task',
            description: 'Updated Description',
        });
    });
});
