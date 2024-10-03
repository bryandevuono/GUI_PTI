import React from 'react';
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

const Container = ({ name, children, id, onDrop }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'CONTAINER',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'CONTAINER',
        drop: (item) => onDrop(item.id, id),
    });

    return (
        <div ref={(node) => drag(drop(node))} className={`container ${isDragging ? 'dragging' : ''}`}>
            <h2>{name}</h2>
            {children}
        </div>
    );
};

export default Container;