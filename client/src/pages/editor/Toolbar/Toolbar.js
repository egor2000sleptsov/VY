import React from 'react';
import s from './Toolbar.module.css'
import {Button} from "@material-ui/core";

function Toolbar(props) {
    const buttons = props.shapes.map((el, i) => (
        <Button size="large" key={i} variant='text' onClick={() => props.setCurrentShape(el)}>{el.name}</Button>))
    return (
        <div className={s.toolbar}>
            {buttons}
            {/*<Button onClick={props.debug}>Debugger</Button>*/}
            <Button onClick={props.clearQueue} variant='contained' color="primary">Очистить холст</Button>
            {/*<Button onClick={props.save}>Скачать</Button>*/}
            {/*<Button onClick={() => props.setShowForm(true)} >Отправить Форму</Button>*/}
        </div>
    );
}

export default Toolbar;
