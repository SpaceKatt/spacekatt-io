import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export * from './App';
export * from './utility';

ReactDOM.render(
  <React.StrictMode>
    <div className="horizontalBound">
      <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
