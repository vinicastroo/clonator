import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import GloabalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes />

      <GloabalStyle />
    </Router>
  );
};

export default App;
