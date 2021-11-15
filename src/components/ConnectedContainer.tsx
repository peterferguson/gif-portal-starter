import React, { useState } from "react"
import { sendGif } from "../utils/sendGif"
import { createGifAccount } from "../utils/createGifAccount"

export const ConnectedContainer: React.FC<{
  gifs: string[]
  setGifList: React.Dispatch<React.SetStateAction<string[]>>
}> = ({ gifs, setGifList }) => {
  const [inputValue, setInputValue] = useState("")

  // @ts-ignore
  const onInputChange: ({ target: { value: string } }) => void = ({
    target: { value },
  }) => setInputValue(value)

  // - If we hit this, it means the program account hasn't be initialized.
  if (gifs.length === 0) {
    return (
      <div className="connected-container">
        <button
          className="cta-button submit-gif-button"
          onClick={() => createGifAccount(setGifList)}
        >
          Do One-Time Initialization For GIF Program Account
        </button>
      </div>
    )
  }

  return (
    <div className="connected-container">
      <input
        type="text"
        placeholder="Enter gif link!"
        value={inputValue}
        onChange={onInputChange}
      />
      <button
        className="cta-button submit-gif-button"
        onClick={() => sendGif(inputValue, setGifList)}
      >
        Submit
      </button>
      <div className="gif-grid">
        {gifs.map((item, index) => (
          <div className="gif-item" key={index}>
            {/* @ts-ignore */}
            <img src={item.gifLink} alt={item.gifLink} />
          </div>
        ))}
      </div>
    </div>
  )
}
