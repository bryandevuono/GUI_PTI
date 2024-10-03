import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import "./Droppable.css";

const Droppable = ({ id, items , onDelete, onEdit, showEdit}) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
            <ul className={`droppable`} ref={setNodeRef}>
                {items.map((control, index) => ( // dit zijn de controls
                    <SortableItem key={index} id={control} onDelete={onDelete} onEdit={onEdit} showEdit={showEdit}/>
                ))}
            </ul>
        </SortableContext>
    );

};

export default Droppable;
