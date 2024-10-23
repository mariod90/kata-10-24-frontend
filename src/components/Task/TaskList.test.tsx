import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskList } from './TaskList';
import { ITask } from "../../models/ITask";

describe('TaskList Component', () => {
    const tasks: ITask[] = [
        { id: 1, title: 'Task 1', description: 'Description 1' },
        { id: 2, title: 'Task 2', description: 'Description 2' },
    ];
    const onDeleteTaskMock = jest.fn();
    const onEditTaskMock = jest.fn();

    test('renders the list of tasks', () => {
        render(
            <TaskList tasks={tasks} onDeleteTask={onDeleteTaskMock} onEditTask={onEditTaskMock} />
        );

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    test('calls onEditTask when edit button is clicked', () => {
        render(
            <TaskList tasks={tasks} onDeleteTask={onDeleteTaskMock} onEditTask={onEditTaskMock} />
        );

        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);
        expect(onEditTaskMock).toHaveBeenCalledWith(tasks[0]);
    });

    test('calls onDeleteTask when delete button is clicked', () => {
        render(
            <TaskList tasks={tasks} onDeleteTask={onDeleteTaskMock} onEditTask={onEditTaskMock} />
        );

        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);
        expect(onDeleteTaskMock).toHaveBeenCalledWith(1);
    });
});
