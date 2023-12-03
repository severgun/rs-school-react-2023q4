import { APP_ROUTES } from '@/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(): React.JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={APP_ROUTES.HOME}>Home</NavLink>
        </li>
        <li>
          <NavLink to={APP_ROUTES.UNCONTROLLED_FORM}>
            Uncontrolled Components
          </NavLink>
        </li>
        <li>
          <NavLink to={APP_ROUTES.CONTROLLED_FORM}>
            Controlled Components
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
