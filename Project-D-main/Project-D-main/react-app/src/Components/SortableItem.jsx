import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item from "./Item";

const SortableItem = ({ id, onDelete, onEdit, showEdit}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <li
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <Item id={id} onDelete={() => onDelete(id)} onEdit={onEdit} showEdit={showEdit}/>
        </li>
    );
};

export default SortableItem;
