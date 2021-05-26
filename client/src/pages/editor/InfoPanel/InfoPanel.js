import React from 'react';
import s from './InfoPanel.module.css'

function InfoPanel(props) {
    return (
        <div className={s.infopanel}>
            <h5>Стоимость материалов: {props.materialCost}</h5>
            <h5>Стоимость услуги мастера: {props.workCost}</h5>
        </div>
    );
}

export default InfoPanel;