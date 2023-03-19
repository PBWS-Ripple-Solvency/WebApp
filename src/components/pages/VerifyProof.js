import React, { useState } from 'react';

function VerifyProof() {
  const [account, setAccount] = useState('');
  const [nfts, setNFTs] = useState(null);

  const handleAccountChange = event => {
    setAccount(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const ws = new WebSocket('wss://s.altnet.rippletest.net:51233');

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
        setNFTs(responseMessage.result);
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
          Account:
          <input type="text" value={account} onChange={handleAccountChange} />
        </label>
        <button type="submit" className='swap'>Check NFTs</button>
      </form>
      {nfts && <pre>{JSON.stringify(nfts, null, 2)}</pre>}
    </div>
  );
}

export default VerifyProof;
