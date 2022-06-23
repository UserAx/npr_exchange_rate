import React from 'react';
import ReactDom from 'react-dom';
import Application from './app/AppComponent';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

function App() {
  return (
      <Application />
    // <Provider>
    // </Provider>
  );
}

const renderApp = () => {
  ReactDom.render(<App />, document.getElementById('root'));
};

renderApp();
