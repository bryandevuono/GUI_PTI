import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

import "./Droppable.css";

const Droppable = ({ id, items }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
            <ul className={`droppable`} id={`nummer${id}`} ref={setNodeRef}>
                {items.map((item) => (
                    <SortableItem key={item} id={item} />
                ))}
            </ul>
        </SortableContext>
    );

};

export default Droppable;
