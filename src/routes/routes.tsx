import App from '@/App';
import { DetailsCard } from '@/components';
import { NotFound } from '@/pages';

export const routesConfig = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: 'details/:id',
        element: <DetailsCard />,
      },
    ],
  },
];
