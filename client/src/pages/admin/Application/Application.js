import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import {getById} from "../../../axios/getById";
import s from './Application.module.css'
import {Image, Layer, Line, Rect, Stage, Text} from "react-konva";
import {Button} from "@material-ui/core";
import jsPDF from "jspdf";
import {abs, round, sign, sin, sqrt} from "mathjs";
import useImage from "use-image";

function Application(props) {
    const formatQueue = queue => {
        debugger
        let tmp = []
        queue.forEach((el) => {
            switch (el.type) {
                case "Line":
                    const katet = sqrt(el.height * el.height + el.width * el.width)
                    tmp.push((<Line x={el.x} y={el.y} key={el.id} ref={{current: null}} stroke="black"
                                    points={[0, 0, el.width, el.height]} />))
                    tmp.push((<Text
                        text={`${round(katet * 10)}мм`}
                        x={el.x + el.width / 2 - 17}
                        y={el.y + el.height / 2 - 17}
                        fontSize={17}
                        rotation={sin((el.height) / katet) * 90 * sign(el.width)}
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

    const PowerSocketImg = require("../../../images/powerSocket.png")
    // const [PowerSocketImg] = useImage("https://psv4.userapi.com/c536436/u189412517/docs/d5/00d6f2b582bb/powerSocket.png?extra=lEKjEv3fDS6VHCBtDD9t1M9grxSRXRtQXNW3_KghL2dg61qIcfScRy2gOB_OjoLmVvboMvqoTfZEMdCQS_8jJinGGJBJL6yxkIPB2EWxWrjT7uhobwb98RvXXQt7Xha1CiSEP8dbL-Do2WktKYs", "Anonymous")
    const [SwitcherImg] = useImage("../../images/switcher.png", 'Anonymous')
    const [LampImg] = useImage("https://sun9-42.userapi.com/impg/KUCVGso6Oyr0E2NNuQWwduZuBcUm6lJ_uz7ZQw/yrZ8H5t2lQc.jpg?size=413x443&quality=96&sign=9af690b728385b82f516f16377a8b618&type=album", "Anonymous")


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
                <div>Имя и Фамилия: {data.customer.name}</div>
                <div>Номер телефона: {data.customer.phone}</div>
                <div>Адрес Объекта: {data.address}</div>
                <div>Прим. цена за работу мастера: {data.costs.workCost} рублей</div>
                <div>Прим. цена за материалы: {data.costs.materialCost} рублей</div>
                <Button variant="outlined" onClick={save}>Скачать проект</Button>
            </div>
            <div className={s.canvas}>
                <Stage
                    width={1000}
                    height={1000}
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
