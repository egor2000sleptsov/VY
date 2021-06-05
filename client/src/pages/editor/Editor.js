import React, {useEffect, useRef, useState} from 'react';
import s from './Editor.module.css'
import {Image, Layer, Line, Rect, Stage, Text} from "react-konva";
import Toolbar from "./Toolbar/Toolbar";
import InfoPanel from "./InfoPanel/InfoPanel";
import useImage from "use-image";
import {jsPDF} from "jspdf"
import {abs, round, sign, sin, sqrt} from 'mathjs'
import {getAllApp} from "../../axios/getAllApp";
import {getById} from "../../axios/getById";
import {createApp} from "../../axios/createApp";

function Editor(props) {
    const nameRef = React.createRef(),
        phoneRef = React.createRef(),
        addressRef = React.createRef(),
        descRef = React.createRef()

    const PowerSocketImg = require("../../images/powerSocket.png")
    // const [PowerSocketImg] = useImage("https://psv4.userapi.com/c536436/u189412517/docs/d5/00d6f2b582bb/powerSocket.png?extra=lEKjEv3fDS6VHCBtDD9t1M9grxSRXRtQXNW3_KghL2dg61qIcfScRy2gOB_OjoLmVvboMvqoTfZEMdCQS_8jJinGGJBJL6yxkIPB2EWxWrjT7uhobwb98RvXXQt7Xha1CiSEP8dbL-Do2WktKYs", "Anonymous")
    const [SwitcherImg] = useImage("../../images/switcher.png", 'Anonymous')
    const [LampImg] = useImage("https://sun9-42.userapi.com/impg/KUCVGso6Oyr0E2NNuQWwduZuBcUm6lJ_uz7ZQw/yrZ8H5t2lQc.jpg?size=413x443&quality=96&sign=9af690b728385b82f516f16377a8b618&type=album", "Anonymous")

    const formatQueue = queue => {
        let tmp = []
        queue.forEach((el) => {
            switch (el.type) {
                case "Line":
                    const katet = sqrt(el.height * el.height + el.width * el.width)
                    tmp.push((<Line x={el.x} y={el.y} key={el.id} ref={{current: null}} stroke="black"
                                    points={[0, 0, el.width, el.height]} draggable={true} onDragStart={dragStart}/>))
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
                                    height={el.height} /*draggable={true} onDragStart={dragStart}*//>))
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
                                     height={el.height} draggable={true} onDragStart={dragStart}/>))
                    break
                case "Switcher":
                    tmp.push((
                        <Image image={SwitcherImg} x={el.x} y={el.y} key={el.id} ref={{current: null}} width={el.width}
                               height={el.height} draggable={true} onDragStart={dragStart}/>))
                    break
                case "Lamp":
                    tmp.push((
                        <Image image={LampImg} x={el.x} y={el.y} key={el.id} ref={{current: null}} width={el.width}
                               height={el.height} draggable={true} onDragStart={dragStart}/>))
                    break
                default:
                    break
            }
        })
        return tmp;
    }

    const canvas = React.createRef()
    const layer = React.createRef()
    const shapeRef = useRef(null)
    let drawingNew = props.drawing
    const queue = formatQueue(props.queue)
    const [shape, setShape] = useState(null)
    const [extraShape, setExtraShape] = useState(null)
    const [extraShape1, setExtraShape1] = useState(null)
    const mouseDownHandler = e => {
        props.setDrawing(true)

        switch (props.currentShape.type) {
            case "Line":
                setShape(<Line
                    x={canvas.current.getPointerPosition().x}
                    y={canvas.current.getPointerPosition().y}
                    points={[0, 0, 0, 0]}
                    width={0}
                    height={0}
                    closed
                    stroke="black"
                    ref={shapeRef}
                />)
                break
            case "Rect":
                setShape(<Rect
                    x={canvas.current.getPointerPosition().x}
                    y={canvas.current.getPointerPosition().y}
                    width={0}
                    height={0}
                    stroke="black"
                    ref={shapeRef}
                />)
                break
            case "PowerSocket":
                setShape(<Image
                    image={PowerSocketImg}
                    x={canvas.current.getPointerPosition().x - 40}
                    y={canvas.current.getPointerPosition().y - 40}
                    width={40}
                    height={40}
                    ref={shapeRef}
                />)
                break
            case "Switcher":
                setShape(<Image
                    image={SwitcherImg}
                    x={canvas.current.getPointerPosition().x - 40}
                    y={canvas.current.getPointerPosition().y - 40}
                    width={40}
                    height={40}
                    ref={shapeRef}
                />)
                break
            case "Lamp":
                setShape(<Image
                    image={LampImg}
                    x={canvas.current.getPointerPosition().x - 40}
                    y={canvas.current.getPointerPosition().y - 40}
                    width={40}
                    height={40}
                    ref={shapeRef}
                />)
                break
            default:
                break
        }

    }
    const mouseMoveHandler = e => {
        if (!drawingNew) return false
        const newWidth = canvas.current.getPointerPosition().x - shape.props.x
        const newHeight = canvas.current.getPointerPosition().y - shape.props.y

        switch (props.currentShape.type) {
            case "Line":
                const katet = sqrt(newHeight * newHeight + newWidth * newWidth)
                setShape(<Line
                    x={shape.props.x}
                    y={shape.props.y}
                    width={abs(newWidth)}
                    height={abs(newHeight)}
                    points={[0, 0, newWidth, newHeight]}
                    stroke="black"
                    ref={shapeRef}
                />)
                setExtraShape(<Text
                    text={`${round(katet * 10)}мм`}
                    x={shape.props.x + newWidth / 2 - 17}
                    y={shape.props.y + newHeight / 2 - 17}
                    fontSize={17}
                    rotation={sin((newHeight) / katet) * 90 * sign(newWidth)}
                />)
                break
            case "Rect":
                setShape(<Rect
                    x={shape.props.x}
                    y={shape.props.y}
                    width={newWidth}
                    height={newHeight}
                    stroke="black"
                    ref={shapeRef}
                />)
                setExtraShape(<Text
                    text={`${abs(newWidth)*10}мм`}
                    x={shape.props.x + newWidth/2 - 17}
                    y={newHeight>0 ? shape.props.y - 17: shape.props.y + newHeight - 17 }
                    fontSize={17}
                />)
                setExtraShape1(<Text
                    text={`${abs(newHeight)*10}мм`}
                    x={newWidth>0 ? shape.props.x - 17: shape.props.x + newWidth - 17 }
                    y={shape.props.y + newHeight/2 + 17}
                    fontSize={17}
                    rotation={270}
                />)
                break
            case "PowerSocket":
                setShape(<Image
                    image={PowerSocketImg}
                    x={canvas.current.getPointerPosition().x - 40}
                    y={canvas.current.getPointerPosition().y - 40}
                    width={40}
                    height={40}
                    ref={shapeRef}
                />)
                break
            case "Switcher":
                setShape(<Image
                    image={SwitcherImg}
                    x={canvas.current.getPointerPosition().x - 40}
                    y={canvas.current.getPointerPosition().y - 40}
                    width={40}
                    height={40}
                    ref={shapeRef}
                />)
                break
            case "Lamp":
                setShape(<Image
                    image={LampImg}
                    x={canvas.current.getPointerPosition().x - 40}
                    y={canvas.current.getPointerPosition().y - 40}
                    width={40}
                    height={40}
                    ref={shapeRef}
                />)
                break
            default:
                break
        }

    }
    const mouseUpHandler = e => {
        props.setDrawing(false)
        if (shape.props.width>0 || shape.props.height>0) {
            switch (props.currentShape.type) {
                case "Rect":
                    props.setQueue({
                        id: queue.length,
                        type: shape.type,
                        x: shape.props.x,
                        y: shape.props.y,
                        width: shape.props.width,
                        height: shape.props.height
                    })
                    break
                case "Line":
                    props.setQueue({
                        id: queue.length,
                        type: shape.type,
                        x: shape.props.x,
                        y: shape.props.y,
                        width: shape.props.points[2],
                        height: shape.props.points[3]
                    })
                    break
                case "PowerSocket":
                    props.setQueue({
                        id: queue.length,
                        type: "PowerSocket",
                        x: shape.props.x,
                        y: shape.props.y,
                        width: shape.props.width,
                        height: shape.props.height
                    })
                    break
                case "Switcher":
                    props.setQueue({
                        id: queue.length,
                        type: "Switcher",
                        x: shape.props.x,
                        y: shape.props.y,
                        width: shape.props.width,
                        height: shape.props.height
                    })
                    break
                case "Lamp":
                    props.setQueue({
                        id: queue.length,
                        type: "Lamp",
                        x: shape.props.x,
                        y: shape.props.y,
                        width: shape.props.width,
                        height: shape.props.height
                    })
                    break
                default:
                    break
            }
        }
        props.setCost()
        setShape(null)
        setExtraShape(null)
        setExtraShape1(null)

    }
    const mouseOutHandler = e => {
        if (drawingNew) {
            props.setDrawing(false)
            setShape(null)
            setExtraShape(null)
            setExtraShape1(null)
        }

    }
    const debug = e => {
        debugger
    }

    function dragStart(e) {
        props.delLastFromQueue()
    }

    //"ctrl+z" and "ctrl+shift+z"
    useEffect(() => {
        const onKeyPress = e => {
            // console.log(e)
            if (e.code === "KeyZ" && e.ctrlKey && !e.shiftKey)
                props.delLastFromQueue()
            else if (e.code === "KeyZ" && e.ctrlKey && e.shiftKey)
                props.addLastFromBufferedShapes()
        }
        document.addEventListener("keypress", onKeyPress)
        return () => {
            document.removeEventListener("keypress", onKeyPress)
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
        pdf.save("canvas.pdf")
    }

    const send = () => {
        const app = {
            customer: {
                name: nameRef.current.value,
                phone: phoneRef.current.value
            },
            costs: {
                workCost: props.workCost,
                materialCost: props.materialCost
            },
            queue: [...props.queue],
            address: addressRef.current.value,
        }
        createApp(app)
    }

    const clearQueue = () =>
        props.clearQueue()


    return (
        <div className={s.editor}>
            <form className={s.form} autoComplete="on" onSubmit={event => {
                event.preventDefault()
                send()
            }}>
                <input ref={nameRef} type='text' placeholder="Имя и фамилия" required/>
                <input ref={phoneRef} type='tel' placeholder='Контактный номер телефона' required />
                <input ref={addressRef} type='text' placeholder='Адрес объекта' required/>
                <input ref={descRef} type='text' placeholder="Примечания" />
                <button type='submit'>Отправить</button>
            </form>
            <Toolbar setCurrentShape={props.setCurrentShape} debug={debug} save={save} clearQueue={clearQueue}
                     shapes={props.shapes}/>
            <div>
                <InfoPanel materialCost={props.materialCost} workCost={props.workCost}/>
                <div onMouseOut={mouseOutHandler}>
                    <Stage
                        className={s.canvas}
                        ref={canvas}
                        width={1000}
                        height={1000}
                        // onMouseDown={mouseDownHandler}
                        onContentMousedown={mouseDownHandler}
                        onMouseUp={mouseUpHandler}
                        onMousemove={mouseMoveHandler}
                    >
                        <Layer ref={layer}>
                            {extraShape1}
                            {queue}
                            {extraShape}
                            {shape}
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
    );
}

export default Editor;
