import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Container from 'src/Container/Container';
import { GlobalStoreContext } from './Context/GlobalContext';

function App (): JSX.Element {
  return (
    <React.Fragment>
      <GlobalStoreContext>
        <Header />
        <Container />
      </GlobalStoreContext>
    </React.Fragment>
  );
}

export default App;
