import React from 'react';
import s from './InfoPanel.module.css'

function InfoPanel(props) {
    return (
        <div className={s.infopanel}>
            Стоимость материалов: <h1>{props.materialCost}</h1>
            Стоимость услуги мастера: <h1>{props.workCost}</h1>
        </div>
    );
}

export default InfoPanel;