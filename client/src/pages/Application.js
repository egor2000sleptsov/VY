import React, {useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hooks";
import {useMessage} from "../hooks/message.hook";

function Application(props) {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        number: "", desc: ''
    })

    useEffect(()=> {
        message(error)
        clearError()
    }, [error,message,clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/test/post', "POST", {...form})
            console.log("data", data)
        } catch (e) {}
    }
    return (
        <div className="row">
            <div className="col s6 offset">
                <h1>РАБОТАЙ</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Заявка</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите номер телефона"
                                    id="number"
                                    type="text"
                                    name="number"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="number">Контактный номер</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите описание"
                                    id="desc"
                                    type="text"
                                    name="desc"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="desc">Описание</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            отправить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Application;