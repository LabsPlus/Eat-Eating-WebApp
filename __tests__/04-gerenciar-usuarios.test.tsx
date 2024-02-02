// GU.test.js
import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import GU from '../app/dashboard/gerenciar-usuarios/page';


describe('GU component', () => {
  test('renders correctly', () => {
    render(<GU />);
    expect(screen.getByText('Gerenciamento de Usuarios')).toBeInTheDocument();
  });

//   test('search functionality works', () => {
//     render(<GU />);
//     fireEvent.change(screen.getByPlaceholderText('Pesquisar por'), 'example');
//     expect(screen.getByPlaceholderText('Pesquisar por')).toHaveValue('example');
//   });

});
