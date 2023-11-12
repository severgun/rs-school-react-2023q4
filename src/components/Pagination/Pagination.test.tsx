import { render, screen, waitFor } from '@testing-library/react';
import Pagination from './Pagination';
import { BrowserRouter } from 'react-router-dom';
import { HttpResponse, http } from 'msw';
import { server } from '@/mocks/node';
import { SearchContextWrapper } from '@/mocks/wrappers';

describe('Pagination component tests', () => {
  test('should render cards as set by combobox', async () => {
    render(<Pagination />, { wrapper: SearchContextWrapper });

    const itemsPerPage = screen.getByRole<HTMLSelectElement>('combobox');
    await waitFor(() => {
      expect(screen.queryAllByRole('listitem')).toHaveLength(
        +itemsPerPage.value
      );
    });
  });

  test('loading message should be visible while waiting for request results', async () => {
    render(<Pagination />, { wrapper: BrowserRouter });

    const loadingMessage = screen.queryByText('Loading...');

    expect(loadingMessage).toBeInTheDocument();
  });

  test('loading message should dissapear after getting request results', async () => {
    render(<Pagination />, { wrapper: BrowserRouter });

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  test('not found message should appear if search return empty result', async () => {
    const handlerEmpyResult = http.post(
      'https://stapi.co/api/v1/rest/animal/search',
      () => {
        const resp = {
          page: {
            pageNumber: 0,
            pageSize: 10,
            numberOfElements: 10,
            totalElements: 563,
            totalPages: 57,
            firstPage: true,
            lastPage: false,
          },
          sort: {
            clauses: [],
          },
          animals: [],
        };

        return HttpResponse.json(resp);
      }
    );

    server.use(handlerEmpyResult);

    render(<Pagination />, { wrapper: SearchContextWrapper });

    await waitFor(() => {
      expect(
        screen.queryByText('Sorry! Nothing was found')
      ).toBeInTheDocument();
    });
  });

  test('should render valid data in card', async () => {
    render(<Pagination />, { wrapper: SearchContextWrapper });

    await waitFor(() => {
      const firstCard = screen.queryAllByRole('listitem')[0];

      expect(firstCard).toHaveTextContent("'Owon");
    });
  });
});
