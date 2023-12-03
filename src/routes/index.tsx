import { RootLayout } from '@/layouts';
import {
  HomePage,
  UncontrolledFormPage,
  ControlledFormPage,
  ErrorPage,
} from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

export const enum APP_ROUTES {
  HOME = '/',
  UNCONTROLLED_FORM = 'uncontrolled',
  CONTROLLED_FORM = 'controlled',
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
        path: APP_ROUTES.UNCONTROLLED_FORM,
        element: <UncontrolledFormPage />,
      },
      {
        path: APP_ROUTES.CONTROLLED_FORM,
        element: <ControlledFormPage />,
      },
    ],
  },
]);
