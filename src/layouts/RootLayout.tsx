import { Footer, Header } from '@/components';
import { Outlet } from 'react-router-dom';

export default function RootLayout(): React.JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
