import React, { useRef, useState } from "react";
import "./Item.css";
import Popup from 'reactjs-popup'


const Item = ({ id, dragOverlay, onDelete, onEdit, showEdit }) => {
    const [open, setOpen] = useState(false);
    const ref2 = useRef();
    const style = {
        cursor: dragOverlay ? "grabbing" : "grab",
    };
    // const jsonObject = jsonData;
    const handleEditclick = (enteredLabel) => {
        if (enteredLabel) {
            id.label = enteredLabel;
            onEdit(id, id.type, id.label);
            setOpen(false);
        }
    };
    const handleTypeclick = (buttontype) => {
        id.type = buttontype;
        setOpen(o => !o);
        ref2.current.close();
    }
    const handleDeleteclick = () => {
        onDelete(id);
    }
    if (!id || typeof id !== 'object') {
        return null;
    }
    if (!showEdit) {
        return (
            <div className="App">
                {checkControl(id, style)}
            </div>
        );
    }
    else {
        return (
            <div className="App">
                {checkControl(id, style)}
                <div className="editContainer">
                    <button onClick={() => handleDeleteclick()} className="DeleteButton">X</button>
                    <Popup
                        trigger={<button className="EditButton"> Edit </button>}
                        modal
                        closeOnDocumentClick
                        ref={ref2}
                        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                    >
                        <div className="popup">
                            <div className="popupMenuText">
                                <h4> Click on a type to modify the item:</h4>
                                <p>Click anywhere to return</p>
                            </div>
                            <button className="popupMenuButton" onClick={() => handleTypeclick('title')}>Title(read-only)</button>
                            <br />
                            <button className="popupMenuButton" onClick={() => handleTypeclick('text')}>Text</button>
                            <br />
                            <button className="popupMenuButton" onClick={() => handleTypeclick('radio')}>Radio</button>
                            <br />
                            <button className="popupMenuButton" onClick={() => handleTypeclick('button')}>Button</button>
                            <br />
                            <button className="popupMenuButton" onClick={() => handleTypeclick('dropdown')}>Drop-down</button>
                            <br />
                        </div>
                    </Popup>
                    <Popup
                        open={open}
                        modal
                        closeOnDocumentClick
                        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                    >
                        <div className="popup">
                            <div className="popupMenuText">
                                <h4> Enter your new label:</h4>
                                <p>Click anywhere to return</p>
                            </div>
                            <input type="text" id="newlabel" className="newlabel" />
                            <button className="submitbutton" onClick={() => handleEditclick(document.getElementById("newlabel").value)}>Edit</button>
                        </div>
                    </Popup>
                </div>
            </div>);
    }
    function checkControl(id, style) {
        if (id.type === "radio") {
            return (
                <div style={style} className="item">
                    <h3>{id.label}</h3>
                    <div>
                        {id.orientation === 'horizontal' ? (
                            <>
                                <label>
                                    <input type="radio" name={id.name} value="Ja" />
                                    Ja
                                </label>
                                <label>
                                    <input type="radio" name={id.name} value="Nee" />
                                    Nee
                                </label>
                            </>
                        ) : (
                            <>
                                <div>
                                    <div>
                                        <label>
                                            <input type="radio" name={id.name} value="Ja" />
                                            Ja
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="radio" name={id.name} value="Nee" />
                                            Nee
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            );
        }
        if (id.type === "read-only") {
            return (
                <div style={style} className="item">
                    {id.name === "previous-reading-read" ? (
                        <div>
                            <h3>{id.labelFormat}</h3>
                            <p>voorbeeld nummer</p>
                        </div>
                    ) : (
                        null
                    )}
                    {id.name === "meter-number" ? (
                        <div>
                            <h3>{id.label}</h3>
                            <p>voorbeeld nummer</p>
                        </div>
                    ) : (
                        null
                    )}
                    {id.name === "photo-before-w-2" ? (
                        <div>
                            <h3>{id.label}</h3>
                        </div>
                    ) : (
                        null
                    )}
                    {id.name === "photo-before-w" ? (
                        <div>
                            <h3>{id.label}</h3>
                        </div>
                    ) : (
                        null
                    )}
                </div>
            );
        }
        if (id.type === "text") {
            return (
                <div style={style} className="item">
                    <h3>{id.label}</h3>
                    <input type="text" />
                </div>
            );
        }
        if (id.type === "numeric") {
            return (
                <div style={style} className="item">
                    <h3>{id.label}</h3>
                    <input type="number" maxLength={id.maxLength} />
                </div>
            );
        }
        if (id.type === "button") {
            return (
                <div style={style} className="item">
                    <button>{id.text}</button>
                </div>
            )
        }
        if (id.type === "dropdown") {
            //filters null options
            const filteredOptions = id.options.filter(option => option !== '');
            return (
                <div style={style} className="item">
                    <h3>{id.label}</h3>
                    <br />
                    <select id="dropdown">
                        {filteredOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))};
                    </select>
                </div>
            )
        }
        // return <h3 key={index}>{control.label}</h3>;
    }
    if(id.type === "select"){
        return (
            <div style={style} className="item">
                <h3>{id.label}</h3>
                <input type="text" />
            </div>
        );
    }
    if(id.type === "group"){
        return (
            <div style={style} className="item">
                <h3>{id.label}</h3>
                <input type="text" />
            </div>
        );
    }
    // return <h3 key={index}>{control.label}</h3>;
}}

}

export default Item;
