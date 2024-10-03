import React, { useState, useRef } from "react";
import jsonData from "./data.json";
import "./App.css";
import Popup from 'reactjs-popup';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Droppable from "./Components/Droppable";
import Item from "./Components/Item";
import { arrayMove, removeAtIndex } from "./utils/array";
import AddBar from "./Components/AddBar";

import arrow from "./Icons/arrow.png";
import StartScreen from "./Components/StartScreen";
import DropdownScreen from "./Components/DropdownScreen";
function App() {
  //Start-up screen
  const [openStart, setOpenStart] = useState(true);
  //state for the controls
  const [itemGroups, setItemGroups] = useState({
    listofcontrols: []
  });
  //renders the controls from the json-file
  loopforgroup(jsonData.controls);

  //popup reference
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  //active id for drag and drop
  const [activeId, setActiveId] = useState(null);
  //new type for adding buttons
  const [newType, setNewType] = useState("default");
  //sensor for drag and drop
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 2, //px
      }
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  //loop through the json-file
  function loopforgroup(controls) {
    for (const control of controls) {
      if (control.type === "group") loopforgroup(control.controls);
      else if (control.type === "radio" || control.type === "read-only" || control.type === "text" || control.type === "numeric" || control.type === "button" || control.type === "dropdown") {
        if (!itemGroups.listofcontrols.includes(control) && control.name !== "previous-reading-estimated" && control.name !== undefined) {
          setItemGroups((prevItemGroups) => ({
            ...prevItemGroups,
            listofcontrols: [...prevItemGroups.listofcontrols, control]
          }));
        }
      }
    }
  }
  // drag and drop functions
  const handleDragStart = ({ active }) => setActiveId(active.id)

  const handleDragCancel = () => setActiveId(null);

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (!active || !over || !active.data.current || !over.data.current || !active.data.current.sortable || !over.data.current.sortable) {
      console.error('not defined');
      return;
    }

    const activeIndex = active.data.current.sortable.index;
    const overIndex = over.id in itemGroups
      ? itemGroups.listofcontrols.length + 1
      : over.data.current.sortable.index;

    setItemGroups((itemGroups) => ({
      ...itemGroups,
      listofcontrols: arrayMove(
        itemGroups.listofcontrols,
        activeIndex,
        overIndex
      ),
    }));

    setActiveId(null);
  };

  //adding buttons
  const handleAddclick = (typeofElement) => {
    setNewType(typeofElement);
    openAddPopup();
  }
  const addElement = (typeofElement, newLabel) => {
    setOpenAdd(false);
    if (typeofElement === "read-only") {
      const newElement = {
        "type": typeofElement,
        "name": "photo-before-w",
        "label": newLabel
      }
      setItemGroups((prevItemGroups) => ({
        ...prevItemGroups,
        listofcontrols: [...prevItemGroups.listofcontrols, newElement]
      }));
      return;
    }
    if (typeofElement === "dropdown") {
      setOpenDropdown(O => !O);
      setDropdownlabel(newLabel);
      return;
    }
    if (typeofElement === "button") {
      const newElement = {
        "type": typeofElement,
        "text": newLabel
      }
      setItemGroups((prevItemGroups) => ({
        ...prevItemGroups,
        listofcontrols: [...prevItemGroups.listofcontrols, newElement]
      }));
      return;
    }
    else {
      const newElement = {
        "type": typeofElement,
        "label": newLabel
      }
      setItemGroups((prevItemGroups) => ({
        ...prevItemGroups,
        listofcontrols: [...prevItemGroups.listofcontrols, newElement]
      }));
    }
  }
  //dropdown
  const handleOptions = (label1, label2, label3, label4) => {
    setOpenDropdown(false);
    const newElement = {
      "type": "dropdown",
      "label": Dropdownlabel,
      "options": [label1, label2, label3, label4]
    }
    setItemGroups((prevItemGroups) => ({
      ...prevItemGroups,
      listofcontrols: [...prevItemGroups.listofcontrols, newElement]
    }));
  };
  //edit label
  const EditLabel = (id, newtype, newlabel) => {
    for (let i = 0; i < itemGroups.listofcontrols.length; i++) {
      if (itemGroups.listofcontrols[i].label === id.label) {
        itemGroups.listofcontrols[i].type = newtype
      }
    }
    console.log(newlabel, newtype);
    for (let i = 0; i < itemGroups.listofcontrols.length; i++) {
      if (itemGroups.listofcontrols[i].label === id.label) {
        if (newtype === "title") {
          itemGroups.listofcontrols[i] = {
            "type": "read-only",
            "name": "photo-before-w",
            "label": newlabel
          }
        }
        else {
          itemGroups.listofcontrols[i].label = newlabel;
          itemGroups.listofcontrols[i].text = newlabel;
        }
      }
    }
    setItemGroups((prevItemGroups) => ({
      ...prevItemGroups,
      listofcontrols: [...prevItemGroups.listofcontrols]
    }));
  }

  const handleClearAll = () => {
    setOpenStart(false);
    jsonData.controls = [];
    setItemGroups((prevItemGroups) => ({
      ...prevItemGroups,
      listofcontrols: []
    }));
    ref.current.close();
  }
  //deletion of element
  const handleDelete = (idToDelete) => {
    jsonData.controls = removeAtIndex(itemGroups.listofcontrols, itemGroups.listofcontrols.indexOf(idToDelete));
    setItemGroups((prevItemGroups) => {
      const updatedList = prevItemGroups.listofcontrols.filter(control => control !== idToDelete);
      return { ...prevItemGroups, listofcontrols: updatedList };
    });
    console.log(itemGroups.listofcontrols);
  };

  const downloadJson = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify({ controls: itemGroups.listofcontrols })], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "controls.json";
    document.body.appendChild(element);
    element.click();
  };
  //import json-file
  const handleImportClick = () => {
    setOpenImport(o => !o);
  }
  const importJson = (jsonstring) => {
    setOpenImport(false);
    try {
      setShowEdit(false);
      itemGroups.listofcontrols = [];
      let newjsonObject = JSON.parse(jsonstring);
      let newlistofcontrols = newjsonObject.controls;
      setItemGroups((prevItemGroups) => ({
        ...prevItemGroups,
        listofcontrols: newlistofcontrols
      }));
      jsonData.controls = newlistofcontrols;
    }
    catch (e) {
      alert("Enter a valid json-file, try again...");
    }
  }
  const [showEdit, setShowEdit] = useState(false);

  const toggleEdit = () => {
    console.log(showEdit);
    setShowEdit(!showEdit);
  };
  //Pop-up menu
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openDropDown, setOpenDropdown] = useState(false);
  const closeModal = () => setOpen(false);
  //dropdown label
  const [Dropdownlabel, setDropdownlabel] = useState("default");

  const openPopup = () => {
    setOpen(o => !o);
  }
  const openAddPopup = () => {
    setOpenAdd(o => !o);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <div>
        <StartScreen
          openStart={openStart}
          importStart={handleImportClick}
          startEmpty={handleClearAll}
          closeModal={closeModal}
        >
        </StartScreen>
        <DropdownScreen
          opendropdown={openDropDown}
          closeModal={closeModal}
          Dropdownlabels={handleOptions}
          newlabel={Dropdownlabel}
        >
        </DropdownScreen>
        <Popup
          open={open}
          closeOnDocumentClick
          modal
          ref={ref}
          onClose={closeModal}
          overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="popup">
            <div className="popupMenuText">
              <h4>Are you sure?</h4>
              <p>Click anywhere to return</p>
            </div>
            <button className="popupMenuButton" onClick={() => handleClearAll()}>Yes</button>
            <br />
            <button className="popupMenuButton" onClick={() => ref.current.close()}>No</button>
          </div>
        </Popup>
        <Popup
          open={openAdd}
          modal
          onClose={() => setOpenAdd(false)}
          closeOnDocumentClick
          ref={ref2}
          overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="popup">
            <div className="popupMenuText">
              <h4> Enter your new label:</h4>
              <p>Click anywhere to return</p>
            </div>
            <input type="text" id="newlabel2" className="newlabel" />
            <button className="submitbutton" onClick={() => addElement(newType, document.getElementById("newlabel2").value)}>Confirm</button>
          </div>
        </Popup>
        <Popup
          open={openImport}
          modal
          closeOnDocumentClick
          ref={ref3}
          onClose={() => setOpenImport(false)}
          overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="popupimport">
            <div className="popupMenuText">
              <h4> Enter your file as text:</h4>
              <p>Click anywhere to return</p>
            </div>
            <textarea type="text" id="file" className="importjson" />
            <button className="submitbuttonimport" onClick={() => importJson(document.getElementById("file").value)}>Import</button>
          </div>
        </Popup>
      </div>
      <div className="addBarContainer">
        <AddBar RadioButtonClick={() => handleAddclick("radio")} TextButtonClick={() => handleAddclick("text")} ButtonClick={() => handleAddclick("button")} TitleClick={() => handleAddclick("read-only")} NumericClick={() => handleAddclick("numeric")} DropdownClick={() => handleAddclick("dropdown")} EditClick={EditLabel} DownloadJson={downloadJson} jsonImport={handleImportClick} Edit={toggleEdit} clearAll={openPopup} />
      </div>
      <div className={`container ${itemGroups.listofcontrols.length === 0 ? 'empty' : ''}`}>
        {itemGroups.listofcontrols.length === 0 ?
          <div className="EmptyDroppableSpace">
            <h4>Select an item from the list to add.</h4>
            <img src={arrow} alt="arrow" className="arrow" />
          </div> :
          <Droppable
            id="container"
            items={itemGroups.listofcontrols}
            activeId={activeId}
            key="container"
            onDelete={handleDelete}
            onEdit={EditLabel}
            showEdit={showEdit}
          />}
      </div>
      <DragOverlay>{activeId ? <Item id={activeId} dragOverlay={true} /> : null}</DragOverlay>
    </DndContext >
  );
}

export default App;
