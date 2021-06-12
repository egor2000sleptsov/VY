import React, {useEffect, useState} from 'react';
import s from './admin.module.css'
import {Button} from "@material-ui/core";
import {getAllApp} from "../../axios/getAllApp";
import Item from "./Item/Item";

function Admin(props) {
    const [data, setData] = useState(false)
    const {isAuth, setAuth} = props
    const passRef = React.createRef()

    useEffect(() => {
        try {
            getAllApp()
                .then(res => {
                    setData(res.data)
                })
        }
        catch (e){
            console.log(e)
        }
    }, [])



    const onSubmit = (e) => {
        e.preventDefault()
        setAuth(passRef.current.value)
    }
    return !isAuth ? (
        <div className={s.main}>
            <div className={s.modalWrapper}>
                <div className={s.modalForm}>
                    <form onSubmit={e => onSubmit(e)}>
                        <label>Введите пароль для входа</label>
                        <input type="password" required ref={passRef}/>
                        <Button variant="contained" color="primary" type="submit">Подтвердить</Button>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <div className={s.main}>
            <div className={s.admin}>
                <h4>Список заявлений</h4>
                {data && data.reverse().map((el, index) => (<Item el={el} key={index}/>))}
            </div>
        </div>
    );

}

export default Admin;
