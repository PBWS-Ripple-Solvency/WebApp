import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main.js";
import NotFound from "./pages/NotFound.js";
import GenerateProof from "./pages/GenerateProof.js";
import VerifyProof from "./pages/VerifyProof.js";
import ZkTransfer from "./pages/ZkTransfer.js";

function AppRoutes() {

    return (
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/generateproof" element={<GenerateProof/>} />
        <Route path="/verifyproof" element={<VerifyProof/>} />
        <Route path="/zktransfer" element={<ZkTransfer/>} />
      </Routes>
    );
  }
  
  export default AppRoutes;