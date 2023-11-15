import { BrowserRouter } from 'react-router-dom';
import DetailsCard from './DetailsCard';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};

vi.mock('react-router-dom', async () => {
  const mod =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...mod,
    useParams: () => ({
      id: 'ANMA0000032315',
    }),
  };
});

describe('DetailsCard component tests', () => {
  test('should display loading indicator while fetching data', () => {
    render(<DetailsCard />, { wrapper: BrowserRouter });

    const loadingMessage = screen.queryByText('Loading...');

    expect(loadingMessage).toBeInTheDocument();
  });

  test('should display correct details after fetching data', async () => {
    renderWithRouter(<DetailsCard />, { route: '/details/ANMA0000032315' });

    const name = await screen.findByRole('heading', {
      level: 3,
      name: "'Owon",
    });
    expect(name).toBeInTheDocument();

    const earthAnimalDetail = await screen.findByText('Earth Animal: False');
    expect(earthAnimalDetail).toBeInTheDocument();

    const earthInsectDetail = await screen.findByText('Earth Insect: False');
    expect(earthInsectDetail).toBeInTheDocument();

    const avianDetail = await screen.findByText('It is avian: False');
    expect(avianDetail).toBeInTheDocument();

    const felineDetail = await screen.findByText('It is feline: False');
    expect(felineDetail).toBeInTheDocument();

    const canineDetail = await screen.findByText('It is canine: False');
    expect(canineDetail).toBeInTheDocument();
  });
});
