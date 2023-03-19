import React, { useState } from 'react';
import './styles/verify.css';
import DownloadButton from "./second/DownloadButton";


function VerifyProof() {
  const [account, setAccount] = useState('');
  const [nfts, setNFTs] = useState(null);
  const [network, setNetwork] = useState('testnet');

  const handleAccountChange = event => {
    setAccount(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    const serverUrl = network === 'mainnet' ? 'wss://s1.ripple.com:51234' : 'wss://s.altnet.rippletest.net:51233'; // switch between mainnet and testnet
    const ws = new WebSocket(serverUrl);

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

  const handleNetworkChange = () => {
    setNetwork(network === 'mainnet' ? 'testnet' : 'mainnet');
  };

  const getData = (link) => {
    const ipfsUrl = link;
    fetch(ipfsUrl)
      .then(response => response.text())
      .then(data => {
        // Copier le texte récupéré dans le presse-papier
        navigator.clipboard.writeText(data)
          .then(() => {
            alert("Data copy to clipboard !");
          })
          .catch(error => {
            console.error("Error : data couldn't be copied, check IPFS file directly", error);
          });
      })
      .catch(error => {
        console.error("Error when fetching data", error);
      });
  }

  return (
    <div className="main">
      <h1>Check Proof</h1>
      <p>💡<i>Only available on XRPL Mainnet and Testnet</i></p>
      <div className="main__listing">
            <h2>Download Proof Verifier executable</h2>
            <p>💻<i>Download the "ring proof" verifier to verify a proof on your computer.</i><br></br>
                First retrieve the data via our online tool on this page and pass it into the dowloaded program interface.</p>
                <DownloadButton/>
      </div>
      <div className="main__listing">
            <h2>Check Solvency Proof and copy the data</h2>
            <p>💻<i>Check the solvency proof of an account and copy the data to paste it into the verifier.</i></p>
      </div>
      
      <button className="network-button" onClick={handleNetworkChange}>
        {network === 'mainnet' ? 'Switch to Testnet' : 'Switch to Mainnet'} {/* add button to switch between mainnet and testnet */}
      </button>
      <p>Current network: <b>{network}</b></p> {/* display the current network */}
      <form onSubmit={handleFormSubmit}>
        <label>
        <p>Enter an address to access of all its solvency proof and find the one that interest you.</p>
          <b>Search by account:</b>
          <input type="text" value={account} onChange={handleAccountChange} />
        </label>
        <button type="submit" className="swap">
          Check solvency proof SBT
        </button>
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
                  <strong>Account (owner):</strong> {nft.Issuer}
                </p>
                <p>
                  <strong>NFTokenID:</strong> {nft.NFTokenID}
                </p>
                <p>
                  <strong>DATA:</strong> {hexToString(nft.URI)}
                </p>
                <button onClick={() => getData(hexToString(nft.URI))}>Copy Proof</button>
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
