import React, { useState } from 'react';
import './styles/verify.css';

function VerifyProof() {
  const [account, setAccount] = useState('');
  const [nfts, setNFTs] = useState(null);

  const handleAccountChange = event => {
    setAccount(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const ws = new WebSocket('wss://s.altnet.rippletest.net:51233'); // Testnet

    ws.addEventListener('open', event => {
      const requestMessage = {
        id: 1,
        command: 'account_nfts',
        account: account,
        ledger_index: 'validated'
      };
      ws.send(JSON.stringify(requestMessage));
    });

    ws.addEventListener('message', event => {
      const responseMessage = JSON.parse(event.data);
      if (responseMessage.type === 'response' && responseMessage.id === 1) {
        setNFTs(responseMessage.result.account_nfts);
      }
    });

    return () => {
      ws.close();
    };
  };

  return (
    <div className="main">
      <h1>Check Proof</h1>
      <p>💡<i>Only available on XRPL Mainnet and Testnet</i></p>
      <form onSubmit={handleFormSubmit}>
        <label>
          <b>Account:</b>
          <input type="text" value={account} onChange={handleAccountChange} />
        </label>
        <button type="submit" className='swap'>Check solvency proof SBT</button>
      </form>
      {nfts && (
        <div className="card-container">
          {nfts.map((nft, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <h2>SBT {index + 1}</h2>
                <div className="status">{nft.Flags === 8 ? 'Valid' : 'Invalid'}</div>
              </div>
              <div className="card-content">
                <p>
                  <strong>Account:</strong> {nft.Issuer}
                </p>
                <p>
                  <strong>NFTokenID:</strong> {nft.NFTokenID}
                </p>
                <p>
                  <strong>URI:</strong> {hexToString(nft.URI)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function hexToString(hex) {
  let string = '';
  for (let i = 0; i < hex.length; i += 2) {
    string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return string;
}

export default VerifyProof;
