import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT, mintNFT2 } from "./utils/interact";
import { getNeedInstallErrorStatus } from "./utils/error-status";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [status2, setStatus2] = useState("");
  const [url2, setURL2] = useState("");

  useEffect(async () => { //TODO: implement
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);
    setStatus2(status);

    addWalletListener();
  }, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setStatus2(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => { //TODO: implement
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  const onMintPressed2 = async () => { //TODO: implement
    const { status } = await mintNFT2(url2);
    setStatus2(status);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      const { status } = getNeedInstallErrorStatus();
      setStatus(status);
      setStatus2(status);
    }
  }

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🧙‍♂️ 游艇兜风 NFT Minter</h1>
      <div className="Part1">
        <p>
          Simply add your asset's link, name, and description, then press "Mint."
        </p>
        <form>
          <h2>🖼 Link to asset: </h2>
          <input
            type="text"
            placeholder="e.g. ipfs://QmbUpvyA86q2GLSh1VKKyugNyoJdKFcthX8Joy5mtU2FSv"
            onChange={(event) => setURL(event.target.value)}
          />
          <h2>🤔 Name: </h2>
          <input
            type="text"
            placeholder="e.g. My first NFT!"
            onChange={(event) => setName(event.target.value)}
          />
          <h2>✍️ Description: </h2>
          <input
            type="text"
            placeholder="e.g. My first NFT Description!"
            onChange={(event) => setDescription(event.target.value)}
          />
        </form>
        <button id="mintButton" onClick={onMintPressed}>
          Mint NFT
        </button>
        <p id="status">
          {status}
        </p>
      </div>
      <br></br>
      <div className="Part1">
        <form>
          <h2>🖼 Json Meatdata Link to asset: </h2>
          <input
            type="text"
            placeholder="e.g. https://opensea.mypinata.cloud/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/1957"
            onChange={(event) => setURL2(event.target.value)}
          />
        </form>
        <button id="mintButton" onClick={onMintPressed2}>
          Mint NFT2
        </button>
        <p id="status">
          {status2}
        </p>
      </div>
    </div>
  );
};

export default Minter;
