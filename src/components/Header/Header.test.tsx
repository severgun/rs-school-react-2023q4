import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import { ProviderWrapper } from '@/mocks/wrapper';

describe('Header component tests', () => {
  test('should set search params on button search click', () => {
    render(<Header />, { wrapper: ProviderWrapper });
    const searchField = screen.getByRole<HTMLInputElement>('textbox');
    const searchButton = screen.getByRole('button', {
      name: 'Search',
    });
    fireEvent.change(searchField, { target: { value: 'test' } });
    fireEvent.click(searchButton);
    const searchParams = new URL(document.location.toString()).searchParams;

    expect(searchParams.get('search')).toEqual('test');
  });
});
