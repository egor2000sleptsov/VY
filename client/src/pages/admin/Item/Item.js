import React from 'react';
import s from '../admin.module.css'
import {Link, NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";


function Item(props) {
    const {el} = props
    const onCLick = () => {
        console.log(el._id)
    }


    return (
        <div className={s.item}>
            <div className={s.address}>
                {el.address}
                {/*<Button><NavLink to={`/admin/${el._id}`}>{el.address}</NavLink></Button>*/}
                {/*<Link to={`/admin/${el._id}`}>{el.address}</Link>*/}
            </div>
            <div className={s.name}>
                {el.customer.name}
            </div>
            <div className={s.status}>
                {el.status}
            </div>
            <div>
                <Button variant="contained" color="primary"><NavLink className={s.link} to={`/admin/${el._id}`}>Подробнее</NavLink></Button>
                {/*<Link to={`/admin/${el._id}`}>{el.address}</Link>*/}
            </div>
        </div>
    );
}

export default Item;
