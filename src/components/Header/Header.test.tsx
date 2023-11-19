import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header component tests', () => {
  test('should save search value to localStorage', () => {
    localStorage.removeItem('searchValue');

    render(<Header />, { wrapper: BrowserRouter });

    const searchField = screen.getByRole<HTMLInputElement>('textbox');
    const searchButton = screen.getByRole('button', {
      name: 'Search',
    });

    fireEvent.change(searchField, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    const storedValue = localStorage.getItem('searchValue');

    expect(storedValue).toEqual('test');
  });

  test('should load search from localStorage', () => {
    const storedValue = localStorage.getItem('searchValue');

    render(<Header />, { wrapper: BrowserRouter });

    const searchField = screen.getByRole<HTMLInputElement>('textbox');

    expect(searchField.value).toEqual(storedValue);
  });
});
