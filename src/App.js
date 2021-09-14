import React from 'react'
import Transactions from './viz/Transactions';
import ConnectionToAWSLoader from './StyledComponents/Loaders/ConnectionToAWSLoader';
import FullWindowMouseTracking from './viz/FullWindowMouseTracking'

function App() {
  return (
    <div className="App">
      <Transactions />
      <FullWindowMouseTracking />
      <ConnectionToAWSLoader />
    </div>
  );
}

export default App;
