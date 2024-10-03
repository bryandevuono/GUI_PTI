import { useState } from "react";
import "./Item.css";
import Popup from 'reactjs-popup';

const StartScreen = ({openStart, importStart, startEmpty, closeModal}) => {
    const handleImport = () => {
        importStart();
    };
    const handleClearAll = () => {
        startEmpty();
    };
    return (
    <div>
      <Popup 
        open={openStart} 
        modal
        onClose={closeModal}
        overlayStyle={{ background: "rgba(0,0,0,0.5)" }} 
      >
      <div className="popup">
        <div className="popupMenuText">
          <h4>Do you want to start from scratch?</h4>
        </div>
        <button className="popupMenuButton" onClick={() => handleClearAll()}>Start from scratch</button>
        <br />
        <button className="popupMenuButton" onClick={() => handleImport()}>Import File</button>
      </div>
      </Popup>
    </div>
  );
};

export default StartScreen;