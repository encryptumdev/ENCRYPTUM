import React, { useState, useEffect } from "react";
import Web3 from "web3";

const MCP_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "agentId", "type": "string" },
      { "internalType": "string", "name": "memoryCID", "type": "string" }
    ],
    "name": "updateMemory",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "agentId", "type": "string" }],
    "name": "getMemory",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];

const MCP_CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS_HERE";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [agentId, setAgentId] = useState("");
  const [memoryCid, setMemoryCid] = useState("");
  const [fetchedCid, setFetchedCid] = useState("");

  // Initialize web3 and contract
  useEffect(() => {
    if (window.ethereum) {
      const w3 = new Web3(window.ethereum);
      setWeb3(w3);

      const mcpContract = new w3.eth.Contract(MCP_ABI, MCP_CONTRACT_ADDRESS);
      setContract(mcpContract);
    } else {
      alert("Please install MetaMask to use this app.");
    }
  }, []);

  // Request account access
  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        alert("Failed to connect wallet");
      }
    }
  };

  // Update memory on contract
  const updateMemory = async () => {
    if (!contract || !account || !agentId || !memoryCid) {
      alert("Fill all fields and connect wallet");
      return;
    }
    try {
      await contract.methods.updateMemory(agentId, memoryCid).send({ from: account });
      alert("Memory updated successfully!");
    } catch (err) {
      alert("Error updating memory: " + err.message);
    }
  };

  // Fetch memory from contract
  const fetchMemory = async () => {
    if (!contract || !agentId) {
      alert("Fill agent ID and connect wallet");
      return;
    }
    try {
      const cid = await contract.methods.getMemory(agentId).call();
      setFetchedCid(cid);
    } catch (err) {
      alert("Error fetching memory: " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Encryptum Agent Dashboard</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected as: {account}</p>
      )}

      <div style={{ marginTop: 20 }}>
        <h2>Update Memory</h2>
        <input
          type="text"
          placeholder="Agent ID"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <input
          type="text"
          placeholder="Memory CID"
          value={memoryCid}
          onChange={(e) => setMemoryCid(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <button onClick={updateMemory}>Update Memory</button>
      </div>

      <div style={{ marginTop: 40 }}>
        <h2>Fetch Memory</h2>
        <input
          type="text"
          placeholder="Agent ID"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          style={{ width: "100%", marginBottom: 10, padding: 8 }}
        />
        <button onClick={fetchMemory}>Fetch Memory CID</button>
        {fetchedCid && (
          <p style={{ marginTop: 10 }}>
            <strong>Memory CID:</strong> {fetchedCid}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
