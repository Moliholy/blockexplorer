import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const block = await alchemy.core.getBlockWithTransactions('latest');
      setBlockNumber(block.number);
      setTransactions(block.transactions);
    }

    fetchData();
  });

  return (
      <div className="App">
          <div>
              Block Number: {blockNumber}
          </div>
          <div>
              <table>
                  <tbody>
                  <tr>
                      <td>Hash</td>
                      <td>From</td>
                      <td>To</td>
                      <td>Value</td>
                  </tr>
                  {transactions.map(({hash, from, to, value}) => (
                    <tr>
                        <td>{`${hash.slice(0, 10)}...${hash.slice(-10)}`}</td>
                        <td>{`${from.slice(0, 10)}...${from.slice(-10)}`}</td>
                        <td>{to ? `${to.slice(0, 10)}...${to.slice(-10)}` : ''}</td>
                        <td>{Utils.formatUnits(value)}</td>
                    </tr>
                  ))}
                  </tbody>

              </table>

          </div>
      </div>
  );
}

export default App;
