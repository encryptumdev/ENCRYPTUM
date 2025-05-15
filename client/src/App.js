import React, { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import CryptoJS from "crypto-js";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

function App() {
  const [file, setFile] = useState(null);
  const [encryptedCID, setEncryptedCID] = useState("");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  // Replace with your secret encryption key
  const secretKey = "my-secret-key";

  async function encryptAndUpload(file) {
    setStatus("Encrypting file...");
    const reader = new FileReader();

    reader.onloadend = async () => {
      const wordArray = CryptoJS.lib.WordArray.create(reader.result);
      const encrypted = CryptoJS.AES.encrypt(wordArray, secretKey).toString();

      setStatus("Uploading encrypted data to IPFS...");
      try {
        const added = await client.add(encrypted);
        setEncryptedCID(added.path);
        setStatus("File uploaded! CID: " + added.path);
      } catch (error) {
        setStatus("Error uploading file: " + error.message);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first");
      return;
    }
    await encryptAndUpload(file);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Encryptum Storage</h1>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0]?.name || "");
            setEncryptedCID("");
            setStatus("");
          }}
        />
        <button type="submit" style={{ marginLeft: 10 }}>
          Encrypt & Upload
        </button>
      </form>

      <p>Status: {status}</p>

      {encryptedCID && (
        <div>
          <p><b>Encrypted CID:</b> {encryptedCID}</p>
          <p><b>File Name:</b> {fileName}</p>
          {/* Add blockchain upload feature here later */}
        </div>
      )}
    </div>
  );
}

export default App;
