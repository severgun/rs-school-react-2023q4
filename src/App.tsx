import React from 'react';
import { Header, Main } from '@/components';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

export default function App(): React.JSX.Element {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Main />
      </Provider>
    </>
  );
}
