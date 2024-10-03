import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from './DraggableItem';
import Container from './container';
import './App.css';
import jsonData from "./data.json";

const App = () => {
  const [containers, setContainers] = useState([
    { id: 1, name: 'Top Left', items: [] },
    { id: 2, name: 'Top Right', items: [] },
    { id: 3, name: 'Bottom Left', items: [] },
    { id: 4, name: 'Bottom Right', items: [] },
  ]);

  const handleDrop = (draggedId, targetId) => {
    const draggedIndex = containers.findIndex((container) => container.id === draggedId);
    const targetIndex = containers.findIndex((container) => container.id === targetId);

    const updatedContainers = [...containers];
    [updatedContainers[draggedIndex], updatedContainers[targetIndex]] = [
      updatedContainers[targetIndex],
      updatedContainers[draggedIndex],
    ];

    setContainers(updatedContainers);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {containers.map((container) => (
          <Container key={container.id} name={container.name} id={container.id} onDrop={handleDrop}>
            {container.items.map((item, index) => (
              <DraggableItem key={index} name={item.name} />
            ))}
          </Container>
        ))}
      </div>
    </DndProvider>
  );
};

export default App;