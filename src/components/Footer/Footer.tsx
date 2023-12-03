import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(): React.JSX.Element {
  return (
    <footer>
      <div>
        <Link to={'https://rs.school/'}>RS School</Link>
      </div>
    </footer>
  );
}
