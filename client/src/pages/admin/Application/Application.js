import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom"
import {getById} from "../../../axios/getById";
import s from './Application.module.css'
import {Image, Layer, Line, Rect, Stage, Text} from "react-konva";
import {Button} from "@material-ui/core";
import jsPDF from "jspdf";
import {abs, asin, pi, round, sign, sin, sqrt} from "mathjs";
import useImage from "use-image";

function Application(props) {
    const formatQueue = queue => {
        let tmp = []
        queue.forEach((el) => {
            switch (el.type) {
                case "Line":
                    const Gypotenuse = sqrt(el.height * el.height + el.width * el.width)
                    tmp.push((<Line x={el.x} y={el.y} key={el.id} ref={{current: null}} stroke="black"
                                    points={[0, 0, el.width, el.height]} />))
                    tmp.push((<Text
                        text={`${round(Gypotenuse * 10)}мм`}
                        x={el.x + el.width / 2 - 17}
                        y={el.y + el.height / 2 - 17}
                        fontSize={17}
                        // rotation={sin((el.height) / katet) * 90 * sign(el.width)}
                        rotation={asin(abs(el.height) / Gypotenuse ) * 180/pi * sign(el.height) * sign(el.width)}
                    />))

                    break
                case "Rect":
                    tmp.push((<Rect x={el.x} y={el.y} key={el.id} ref={{current: null}} stroke="black" width={el.width}
                                    height={el.height} />))
                    tmp.push((<Text
                        text={`${abs(el.width) * 10}мм`}
                        x={el.x + el.width / 2 - 17}
                        y={el.height > 0 ? el.y - 17 : el.y + el.height - 17}
                        fontSize={17}
                        align='left'
                    />))
                    tmp.push((<Text
                        text={`${abs(el.height) * 10}мм`}
                        x={el.width > 0 ? el.x - 17 : el.x + el.width - 17}
                        y={el.y + el.height / 2 + 17}
                        fontSize={17}
                        rotation={270}
                        align='left'
                    />))
                    break
                case "PowerSocket":
                    tmp.push((<Image image={PowerSocketImg} x={el.x} y={el.y} key={el.id} ref={{current: null}}
                                     width={el.width}
                                     height={el.height} />))
                    break
                case "Switcher":
                    tmp.push((
                        <Image image={SwitcherImg} x={el.x} y={el.y} key={el.id} ref={{current: null}} width={el.width}
                               height={el.height} />))
                    break
                case "Lamp":
                    tmp.push((
                        <Image image={LampImg} x={el.x} y={el.y} key={el.id} ref={{current: null}} width={el.width}
                               height={el.height} />))
                    break
                default:
                    break
            }
        })
        return tmp;
    }

    const [SwitcherImg] = useImage("https://psv4.userapi.com/c536436/u189412517/docs/d50/94ec29f1eb93/switcher.png?extra=n1Tv23afu2_Ch2ouxES9jGJAznoRaXnjBlhfED-SB0w-BeziWF8WzOQS7sLcCDIfRKyrMXTw51Th_5qX_Ow6485XSX1-eaLWX4SjrEiN57x7huEYIP3vLBNoRjOKNyKAo_JtKxyCd5vl91vA1M44_Q", 'Anonymous')
    const [PowerSocketImg] = useImage("https://psv4.userapi.com/c536436/u189412517/docs/d5/3b2c0de935df/powerSocket.png?extra=stx_5ouk-NNPC1vMQJfnyiJru9X07LJ2hgy2GAzQtjcRcDfwXYK2y-MzK6C6HB_pAMaSnVMF0TaBj7_66sK-bHmGXC_lq-ACHNUa8zE8Ri9ze_eijwe8ptcESsBUyx9fta6tGXWQOPWQA9h0TOfEjg", 'Anonymous')
    const [LampImg] = useImage("https://psv4.userapi.com/c536436/u189412517/docs/d12/b602701a0951/lamp.png?extra=AgbIDHBEPjLz0v8zyWS6FJCBChzOkzEJxaDWy1ti_2OqL86iaq7EtFnr5gnepuXoUnMPlZlqFY4t3Er6bShhwykzts7Pk6kIb4BeOZEVVJkB-DBlGyVZy_co1XJ9FVZUgEry_WMTUyM4pz8OZS76Zw", "Anonymous")


    const canvas = React.createRef();
    let {id} = useParams()
    const [data, setData] = useState(false)
    const [queue, setQueue] = useState([])
    const [status, setStatus] = useState(false)

    useEffect(() => {
        try {
            getById(id)
                .then(res => {
                    switch (res.status) {
                        case "success":
                            setData(res.data)
                            setQueue(formatQueue(res.data.queue))
                            break
                        case "notSuccess":
                            console.log('invalid ID')
                            break
                        case "notExist":
                            console.log('notExist')
                            break
                        default:
                            console.log(res)
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    const save = () => {
        let pdf = new jsPDF('l', 'px', [canvas.current.width(), canvas.current.height()])
        pdf.setTextColor('#000000')
        pdf.addImage(
            canvas.current.toDataURL({pixelRatio: 2}),
            0,
            0,
            canvas.current.width(),
            canvas.current.height(),
        )
        pdf.save(`${data.address}.pdf`)
    }

    if (!data)
        return (
            <div className={s.main}>
                подождите
            </div>
        )
    return (
        <div className={s.main}>
            <div className={s.infoPanel}>
                <div>Имя и Фамилия: <b>{data.customer.name}</b></div>
                <div>Номер телефона: <b>{data.customer.phone}</b></div>
                <div>Адрес Объекта: <b>{data.address}</b></div>
                <div>Стоимость работы мастера: <b>{data.costs.workCost}</b> р.</div>
                <div>Стоимость материалы: <b>{data.costs.materialCost}</b> р.</div>
                <div className={s.buttons}>
                    <Button color="primary" variant="outlined">
                        <NavLink className={s.link} to={`/admin`}>
                            Назад
                        </NavLink>
                    </Button>
                    <Button color="primary" variant="contained" onClick={save}>Скачать проект</Button>
                </div>
            </div>
            <div className={s.canvas}>
                <Stage
                    width={1530}
                    height={720}
                    ref={canvas}
                >
                    <Layer>
                        {queue}
                    </Layer>
                </Stage>
            </div>
        </div>
    );
}

export default Application;
