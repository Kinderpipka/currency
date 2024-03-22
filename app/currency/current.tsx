"use client"
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";

const MetamaskPage: React.FC = () => {
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(0);
  const [bnbBalance, setBnbBalance] = useState(0);
  const [recipientAddress, setRecipientAddress] = useState("");
 
  useEffect(() => {
    setMetamaskInstalled(!!(window as any).ethereum);

    if (metamaskInstalled) {
      // Получение данных о кошельке и балансе
      (window as any).ethereum.request({ method: "eth_requestAccounts" }).then((accounts: string[]) => {
        setWalletAddress(accounts[0]);
        (window as any).ethereum.request({ method: "eth_getBalance", params: [accounts[0], "latest"] }).then((balance: string) => {
          setEthBalance(parseFloat((Number(balance) / 10 ** 18).toFixed(4)));
        });
      });
    }
  }, [metamaskInstalled]);

  const handleSendTransaction = async () => {
    if (!recipientAddress) {
      alert("Please enter a valid recipient address.");
    } else {
      try {
        await (window as any).ethereum.request({
          method: "eth_sendTransaction",
          params: [{ to: recipientAddress, value: "0x1" }],
        });
        alert("Transaction sent successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to send transaction.");
      }
    }
  };

  return (
    <div className="div_currency">
      {metamaskInstalled ? (
        <>
          <p className="head">Wallet Address: {walletAddress}</p>
          <div className="div_balance">
          <p className="p_balance">ETH Balance: {ethBalance} ETH</p>
          <p className="p_balance">BNB Balance: {bnbBalance} BNB</p>
          </div>
          <TextField
            label="Recipient Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button onClick={handleSendTransaction} variant="contained" color="primary" style={{ marginBottom: "20px" }}>
            Send Transaction
          </Button>
         
        
        </>
      ) : (
        <p>Metamask extension not detected. Please install it.</p>
      )}
    </div>
  );
};

export default MetamaskPage;