import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Tasks from './Tasks';
import { AuthProvider } from '../context/AuthContext';
import * as api from '../services/api';

jest.mock('../services/api');

describe('Tasks Component', () => {
    const mockTasks = [
        { id: 1, title: 'Test Task 1', description: 'Description 1' },
        { id: 2, title: 'Test Task 2', description: 'Description 2' },
    ];

    beforeEach(() => {
        (api.fetchTasks as jest.Mock).mockResolvedValue(mockTasks);
        (api.createTask as jest.Mock).mockImplementation(async (task) => ({ ...task, id: Math.random() }));
        (api.deleteTask as jest.Mock).mockImplementation(async (id) => {});
        (api.updateTask as jest.Mock).mockImplementation(async (task) => task);
    });

    test('renders tasks and allows task creation', async () => {
        render(
            <AuthProvider>
                <Tasks />
            </AuthProvider>
        );

        // Check if tasks are rendered
        await waitFor(() => expect(screen.getByText('Test Task 1')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Test Task 2')).toBeInTheDocument());

        // Create a new task
        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
        fireEvent.click(screen.getByText('Create Task'));

        await waitFor(() => expect(screen.getByText('New Task')).toBeInTheDocument());
    });

    test('allows task deletion', async () => {
        render(
            <AuthProvider>
                <Tasks />
            </AuthProvider>
        );

        // Check initial tasks
        await waitFor(() => expect(screen.getByText('Test Task 1')).toBeInTheDocument());

        // Delete the first task
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);

        await waitFor(() => expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument());
    });

    test('allows task editing', async () => {
        render(
            <AuthProvider>
                <Tasks />
            </AuthProvider>
        );

        // Check initial tasks
        await waitFor(() => expect(screen.getByText('Test Task 1')).toBeInTheDocument());

        // Edit the first task
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Updated Task' } });
        fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Updated Description' } });
        fireEvent.click(screen.getByText('Update Task'));

        await waitFor(() => expect(screen.getByText('Updated Task')).toBeInTheDocument());
    });
});
