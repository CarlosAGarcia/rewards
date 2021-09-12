import React from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import { createStore } from 'redux'
import WebSocketProvider from './websocket/websocket'
import StylingWrapper from './StyledComponents/StylingWrapper.style'
import BasicCanvas from './background/BasicCanvas'

export const store = createStore(rootReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketProvider>

          <StylingWrapper>
            <BasicCanvas/>
            <App />
          </StylingWrapper>

      </WebSocketProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
