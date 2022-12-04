import "./App.css";

import { React, useEffect, useState } from "react";

function App() {
  const [click, setClick] = useState(false);
  const [inputChange, setInputchange] = useState("");
  const [imgsrc, setImgsrc] = useState();
  const [loading, setLoading] = useState();
  const handleclick = (e) => {
    
      
    
      console.log("key press");
      if (!inputChange) return;
      setClick(true);
      // setImgsrc(
      //   `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${inputChange}`
      // )
      setLoading("Generating QR Code...");
      fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${inputChange}`
      ).then((data) => {
        setLoading("Generate QR Code");
        setImgsrc(data.url);
      });
    
  };

  const removeQrContainer = () => {
    if (!inputChange && click) {
      setClick(false);
    }
  };

  useEffect(() => {
    removeQrContainer();
  }, [click, inputChange]);

  return (
    <div className={click ? "Wrapper active" : "Wrapper"}>
      <header>
        <h1>QR Code Generator</h1>
        <p>Paste a url or enter text to create QR code</p>
      </header>
      <div className="form">
        <input
          type="text"
          onChange={(e) => setInputchange(e.target.value)}
          placeholder="Enter text or url"
        />
        <button onClick={(e)=>handleclick(e)}>
          {loading ? loading : "Generate QR Code"}
        </button>
      </div>
      <div className="qr_code">
        <img src={imgsrc} alt="" />
      </div>
    </div>
  );
}

export default App;
