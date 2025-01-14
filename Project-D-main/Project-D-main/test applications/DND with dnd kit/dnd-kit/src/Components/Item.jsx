import React from "react";

import "./Item.css";

const Item = ({ id, dragOverlay }) => {
    const style = {
        cursor: dragOverlay ? "grabbing" : "grab",
    };

    return (
        <div style={style} className="item">
            {console.log("test" + id)}
            Item {id}
        </div>
    );
};

export default Item;
