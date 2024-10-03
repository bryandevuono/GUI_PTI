import "./AddBar.css"

// import icons 
import titleIcon from "../Icons/title-2.png"
import textIcon from "../Icons/font.png"
import radioIcon from "../Icons/buttons.png"
import buttonIcon from "../Icons/press-button.png"
import dropdownIcon from "../Icons/chevron.png"
import downloadIcon from "../Icons/download.png"
import ptiLogo from "../Icons/pti-logo-klein.png"
import editIcon from "../Icons/edit3.png"
import clearIcon from "../Icons/trash.png"
import uploadIcon from "../Icons/upload.png"

const AddBar = ({RadioButtonClick, TextButtonClick, ButtonClick, TitleClick, DropdownClick, DownloadJson, jsonImport, Edit, clearAll}) => {
    const handleRadioButtonClick = () => {
        RadioButtonClick();
      };
    const handleTextButtonClick = () => {
        TextButtonClick();
    };
    const handleButtonClick = () => {
        ButtonClick();
    };
    const handleTitleClick = () => {
        TitleClick();
    };
    const handleDropdownClick = () => {
        DropdownClick();
    };
    const handleJsonDownload = () => {
        DownloadJson();
    };
    const handleJsonImport = () => {
        jsonImport();
    }
    const handleEdit = () => {
        Edit();
    }
    const handleClearAll = () => {
        clearAll();
    };
   
    return (
        <div className='container'>
            <a href="https://pti.nl" target="_blank" rel="noreferrer"><img src={ptiLogo} alt="pti logo" className="logo"/></a>
            <button className="addButton" onClick={handleEdit}><img src={editIcon} alt="edit" className="icon"/>Edit</button>
            <button className="addButton" onClick={handleClearAll}><img src={clearIcon} alt="clear all" className="icon"/>Clear All</button>
            
            <h2 className='addBarTitle2'>Add:</h2>
            <button className="addButton" onClick={handleTitleClick}><img src={titleIcon} alt="add title" className="icon"/>Title</button>
            <button className="addButton" onClick={handleTextButtonClick}><img src={textIcon} alt="add text" className="icon"/>Text</button>
            <button className="addButton" onClick={handleRadioButtonClick}><img src={radioIcon} alt="add radio buttons" className="icon"/>Radio</button>
            <button className="addButton" onClick={handleButtonClick}><img src={buttonIcon} alt="add button" className="icon"/>Button</button>
            <button className="addButton" onClick={handleDropdownClick}><img src={dropdownIcon} alt="add dropdown" className="icon"/>Dropdown</button>
            <button className="downloadButton" onClick={handleJsonImport}>Import Json-file<img src={uploadIcon} alt="download json" className="downloadIcon"/></button>
            <button className="downloadButton" onClick={handleJsonDownload}>Download<img src={downloadIcon} alt="download json" className="downloadIcon"/></button>
        </div>
    )
}

export default AddBar