import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for custom jest matchers
import Popover from '../app/components/modal-add-user/page';

describe('Popover Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Popover />);
    expect(getByText('Adicionar usuários')).toBeInTheDocument();
  });

  it('opens modal on button click', async () => {
    const { getByText, getByTestId } = render(<Popover />);
    fireEvent.click(getByText('Adicionar usuários'));
    await waitFor(() => {
      expect(getByTestId('modal')).toBeInTheDocument();
    });
  });

//   it('displays step 1 content by default', () => {
//     const { getByLabelText } = render(<Popover />);
//     expect(getByLabelText('Nome completo')).toBeInTheDocument();
//   });

});
