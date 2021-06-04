import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './stylings/styles.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index.jsx';
import thunk from 'redux-thunk';

import App from './components/App.jsx';

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));

  // store.subscribe(() => {
//   console.log('index.jsx file:', store.getState());
//   console.log('state updated!');
// });