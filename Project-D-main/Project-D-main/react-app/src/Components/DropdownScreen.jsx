import "./Item.css";
import Popup from 'reactjs-popup';

const DropdownScreen = ({ opendropdown, closeModal, Dropdownlabels, newlabel }) => {
  const handleDropdown = (label1, label2, label3, label4) => {
    Dropdownlabels(label1, label2, label3, label4);
  };
  return (
    <div>
      <Popup
        open={opendropdown}
        modal
        onClose={closeModal}
        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div className="popup">
          <div className="popupMenuText">
            <h4>Give the options:</h4>
          </div>
          <input type="text" id="newlabeld1" className="optionlist" />
          <br />
          <input type="text" id="newlabeld2" className="optionlist" />
          <br />
          <input type="text" id="newlabeld3" className="optionlist" />
          <br />
          <input type="text" id="newlabeld4" className="optionlist" />
          <button className="submitbutton" onClick={() => handleDropdown(document.getElementById("newlabeld1").value, document.getElementById("newlabeld2").value, document.getElementById("newlabeld3").value, document.getElementById("newlabeld4").value, newlabel)}>Confirm</button>
        </div>
      </Popup>
    </div>
  );
};

export default DropdownScreen;