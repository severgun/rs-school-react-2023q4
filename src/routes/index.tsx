import { RootLayout } from '@/layouts';
import {
  ControlledFormPage,
  ErrorPage,
  HomePage,
  UncontrolledFormPage,
} from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

export const enum APP_ROUTES {
  HOME = '/',
  CONTROLLED_FORM = 'controlled',
  UNCONTROLLED_FORM = 'uncontrolled',
}

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: APP_ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: APP_ROUTES.CONTROLLED_FORM,
        element: <ControlledFormPage />,
      },
      {
        path: APP_ROUTES.UNCONTROLLED_FORM,
        element: <UncontrolledFormPage />,
      },
    ],
  },
]);
