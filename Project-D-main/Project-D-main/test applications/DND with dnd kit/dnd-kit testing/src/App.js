import React, { useState } from "react";
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
import { arrayMove, insertAtIndex, removeAtIndex } from "./utils/array";

import { createSnapModifier } from '@dnd-kit/modifiers';

import "./App.css";
import logo from "./PTI-LOGO.jpg";
import jsonData from "./data.json";

function App() {
  const [itemGroups, setItemGroups] = useState({
    group1: jsonData
  });
  const [activeId, setActiveId] = useState(null);
  const [newItemText, setNewItemText] = useState(""); // State to hold text for new item

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragCancel = () => setActiveId(null);

  const handleDragOver = ({ active, over }) => {
    // Implementation remains the same
  };

  const handleDragEnd = ({ active, over }) => {
    // Implementation remains the same
  };

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    // Implementation remains the same
  };

  const addNewItem = () => {
    const newItem = {
      id: Date.now().toString(), // Generating a unique ID for the new item
      text: newItemText // Assigning text to the new item
    };

    setItemGroups((prevItemGroups) => ({
      ...prevItemGroups,
      group1: [...prevItemGroups.group1, newItem] // Adding the new item to the array
    }));

    setNewItemText(""); // Resetting the input field after adding the item
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="rightcontainer">
        <Droppable
          id="group1"
          items={itemGroups.group1}
          activeId={activeId}
          key="group1"
        />
      </div>
      <DragOverlay>{activeId ? <Item id={activeId} dragOverlay /> : null}</DragOverlay>
    </DndContext>
  );
}

export default App;
