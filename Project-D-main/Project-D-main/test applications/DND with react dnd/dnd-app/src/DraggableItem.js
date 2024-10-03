import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ name }) => {
    const [, drag] = useDrag({
        type: 'ITEM',
    });

    return (
        <div ref={drag} className="draggable-item">
            {name}
        </div>
    );
};

export default DraggableItem;