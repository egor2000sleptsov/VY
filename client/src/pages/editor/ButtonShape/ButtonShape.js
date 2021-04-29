import React from 'react';

function ButtonShape(props) {

    return (
        <label>
            <input className="btn with-gap" name="ShapeButton" type="radio"/>
            <span>{props.name}</span>
        </label>
            // <button className="btn ">{props.name}</button>
    );
}

export default ButtonShape;