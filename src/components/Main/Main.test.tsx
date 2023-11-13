import { routesConfig } from '@/routes/routes';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  RouterProvider,
  createBrowserRouter,
  createMemoryRouter,
} from 'react-router-dom';

const renderAppWithBrowserRouter = () => {
  const router = createBrowserRouter(routesConfig);

  render(<RouterProvider router={router} />);
};

describe('App tests', () => {
  test('should display loading indicator while fetching data', async () => {
    renderAppWithBrowserRouter();

    const link = await screen.findByRole('link', { name: "'Owon" });
    fireEvent.click(link);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('click on link should open details card', async () => {
    renderAppWithBrowserRouter();
    const link = await screen.findByRole('link', { name: "'Owon" });
    fireEvent.click(link);
    const detailsHeader = await screen.findByRole('heading', {
      level: 3,
      name: "'Owon",
    });
    expect(detailsHeader).toBeInTheDocument();
    const detailsTitle = await screen.findByRole('heading', {
      level: 4,
      name: 'Details:',
    });
    expect(detailsTitle).toBeInTheDocument();
    const detailsEarthAnimal = await screen.findByText('Earth Animal: False');
    expect(detailsEarthAnimal).toBeInTheDocument();
    const detailsEarthInsect = await screen.findByText('Earth Insect: False');
    expect(detailsEarthInsect).toBeInTheDocument();
    const detailsAvian = await screen.findByText('It is avian: False');
    expect(detailsAvian).toBeInTheDocument();
    const detailsFeline = await screen.findByText('It is feline: False');
    expect(detailsFeline).toBeInTheDocument();
    const detailsCanine = await screen.findByText('It is canine: False');
    expect(detailsCanine).toBeInTheDocument();
  });

  test('close button should hide details card', async () => {
    renderAppWithBrowserRouter();
    const link = await screen.findByRole('link', { name: "'Owon" });
    fireEvent.click(link);
    const button = await screen.findByRole('button', { name: 'Close' });
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByText('Details:')).not.toBeInTheDocument();
    });
  });

  test('not found page should be displayed if wrong path used', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ['/this/is/random/path'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
