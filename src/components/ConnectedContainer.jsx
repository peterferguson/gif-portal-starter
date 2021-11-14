import { useState } from "react"
import { sendGif } from "../utils/sendGif"

export const ConnectedContainer = ({ gifs, addNewGif }) => {
  const [inputValue, setInputValue] = useState("")
  const onInputChange = ({ target: { value } }) => setInputValue(value)
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
        onClick={() => sendGif(inputValue)}
      >
        Submit
      </button>
      <div className="gif-grid">
        {gifs.map(gif => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  )
}
