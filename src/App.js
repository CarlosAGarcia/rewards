import React from 'react'
import Transactions from './viz/Transactions';
import ConnectionToAWSLoader from './StyledComponents/Loaders/ConnectionToAWSLoader';

function App() {
  return (
    <div className="App">
      <Transactions />
      <ConnectionToAWSLoader />
    </div>
  );
}

export default App;
