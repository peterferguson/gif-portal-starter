import { useEffect, useState } from "react"
import "./App.css"
import twitterLogo from "./assets/twitter-logo.svg"
import { ConnectedContainer } from "./components/ConnectedContainer"
import { NotConnectedContainer } from "./components/NotConnectedContainer"
import { TWITTER_HANDLE, TWITTER_LINK } from "./constants"
import { checkIfWalletIsConnected } from "./utils/checkIfWalletIsConnected"

const App = () => {
  const [walletAddress, setWalletAddress] = useState("")
  const [gifList, setGifList] = useState([])

  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      const responseKey = await checkIfWalletIsConnected()
      console.log("Connected with Public Key:", responseKey)
      if (responseKey) setWalletAddress(responseKey)
    }
    window.addEventListener("load", onLoad)
    return () => window.removeEventListener("load", onLoad)
  }, [])

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            Squid Game CONFUSION collection in the metaverse ✨
          </p>
          {walletAddress ? (
            <ConnectedContainer gifs={gifList} setGifList={setGifList} />
          ) : (
            <NotConnectedContainer />
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  )
}

export default App
