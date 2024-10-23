import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from './Home';
import { AuthProvider } from '../context/AuthContext';

describe('Home Component', () => {
    test('renders the login form', () => {
        render(
            <AuthProvider>
                <Home />
            </AuthProvider>
        );

        // Verificar si el formulario de login está presente
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText(/Enter/i)).toBeInTheDocument();
    });

    test('allows the user to log in', () => {
        render(
            <AuthProvider>
                <Home />
            </AuthProvider>
        );

        // Llenar el formulario de login
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'admin' } });

        // Hacer click en el botón de login
        fireEvent.click(screen.getByText(/Enter/i));

        // Verificar si el login fue exitoso (según la lógica de autenticación)
        const auth = sessionStorage.getItem('isAuth');
        expect(auth).toBeTruthy()
        // Podrías mockear el estado de autenticación y hacer una afirmación aquí si cambió.
    });

    test('displays error on incorrect login', () => {
        render(
            <AuthProvider>
                <Home />
            </AuthProvider>
        );

        // Llenar el formulario con credenciales incorrectas
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrongUser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongPass' } });

        // Hacer click en el botón de login
        fireEvent.click(screen.getByText(/Enter/i));

        // Verificar si se muestra el mensaje de error
        expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
});
