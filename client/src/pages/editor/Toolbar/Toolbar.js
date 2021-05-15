import React from 'react';
import s from './Toolbar.module.css'
import {Button} from "@material-ui/core";
import useImage from "use-image";

function Toolbar(props) {
    const buttons = props.shapes.map((el,i) => (
        <Button key={i} onClick={() => props.setCurrentShape(el)}>{el.name}</Button>))
    return (
        <div className={s.toolbar}>
            {buttons}
            <Button onClick={props.debug}>Debugger</Button>
            <Button onClick={props.save}>save</Button>
            <Button onClick={props.clearQueue}>Clear All</Button>

        </div>
    );
}

export default Toolbar;