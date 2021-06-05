import React from 'react';
import s from '../admin.module.css'
import {Link, Redirect} from "react-router-dom";


function Item(props) {
    const {el} = props
    const onCLick = () => {
        console.log(el._id)
    }



    return (
        <div className={s.item} >
                <Link to={`/admin/${el._id}`}>{el.address}</Link>
                <div>{el.customer.name}</div>
                <div>{el.status}</div>
        </div>
    );
}

export default Item;
