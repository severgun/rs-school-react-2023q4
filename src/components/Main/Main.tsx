import { Outlet } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import styles from './Main.module.css';

export default function Main(): React.JSX.Element {
  return (
    <main>
      <h1>Star Track Animals:</h1>
      <div className={styles.content}>
        <Pagination />
        <Outlet />
      </div>
    </main>
  );
}
