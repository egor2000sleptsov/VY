import React from 'react';
import s from './Toolbar.module.css'
import {Button} from "@material-ui/core";
import useImage from "use-image";

function Toolbar(props) {
    const buttons = props.shapes.map(el => (
        <Button key={props.shapes.indexOf(el)} onClick={() => props.setCurrentShape(el)}>{el}</Button>))

    const image = useImage("https://o.remove.bg/downloads/351dfb30-0e68-4276-b085-bf6f082a29da/png-clipart-ac-power-plugs-and-sockets-wiring-diagram-electronic-symbol-electricity-symbol-miscellaneous-angle-removebg-preview.png")
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