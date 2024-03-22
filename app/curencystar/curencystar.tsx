"use client"
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";

const Star: React.FC = () => {
 
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [network, setNetwork] = useState("mainnet");
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(0);
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

  const handleNetworkChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setNetwork(event.target.value as string);
  };

  return (
    <div className="div_currency">
      {metamaskInstalled ? (
        <>
          <Select value={network} onChange={handleNetworkChange}>
            <MenuItem value="mainnet">Mainnet</MenuItem>
            <MenuItem value="ropsten">Ropsten Testnet</MenuItem>
            <MenuItem value="rinkeby">Rinkeby Testnet</MenuItem>
            <MenuItem value="goerli">Goerli Testnet</MenuItem>
            <MenuItem value="kovan">Kovan Testnet</MenuItem>
          </Select>
          <p className="head">Wallet Address: {walletAddress}</p>
          <p>ETH Balance: {ethBalance} ETH</p>
          <TextField
            label="Recipient Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <Button onClick={handleSendTransaction} variant="contained" color="primary">
            Send Transaction
          </Button>
        </>
      ) : (
        <p>Metamask extension not detected. Please install it.</p>
      )}
    </div>
  );
};

export default Star;