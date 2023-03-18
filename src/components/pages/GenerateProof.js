import React, { useState, useEffect } from "react";
import DownloadButton from "./second/DownloadButton";

function GenerateProof(){
    console.log("GenerateProof");
    return(
        <div className="main">
            <h1>Generate Proof</h1>
            <p>💡<i>Only available XRPL Mainnet and Testnet</i></p>
            <div className="main__listing">
                <h2>Download Proof Generator executable</h2>
                <p>💡<i>Download the "ring proof" generator to generate your proof on your computer</i></p>
                    <DownloadButton/>
            </div>
            
        </div>
    )
}
export default GenerateProof; 