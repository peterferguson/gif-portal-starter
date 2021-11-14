import twitterLogo from "./assets/twitter-logo.svg"
import { useState, useEffect, useCallback } from "react"
import "./App.css"
import { checkIfWalletIsConnected } from "./utils/checkIfWalletIsConnected"
import { ConnectedContainer } from "./components/ConnectedContainer"
import { NotConnectedContainer } from "./components/NotConnectedContainer"

// Constants
const TWITTER_HANDLE = "_buildspace"
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`
const TEST_GIFS = [
  "https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp",
  "https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g",
]

const App = () => {
  const [walletAddress, setWalletAddress] = useState("")
  const [gifList, setGifList] = useState([])

  const addNewGif = useCallback(gif => {
    setGifList([...gifList, gif])
  }, [])

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

  useEffect(() => {
    if (walletAddress) {
      setGifList(TEST_GIFS)
    }
  }, [walletAddress])

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            Squid Game CONFUSION collection in the metaverse ✨
          </p>
          {walletAddress ? (
            <ConnectedContainer gifs={gifList} addNewGif={addNewGif} />
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
