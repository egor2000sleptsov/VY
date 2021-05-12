import React, {useEffect, useRef, useState} from 'react';
import s from './Editor.module.css'
// import ButtonShape from "./ButtonShape/ButtonShape";
import {Image, Layer, Line, Rect, Stage} from "react-konva";
import Toolbar from "./Toolbar/Toolbar";
import InfoPanel from "./InfoPanel/InfoPanel";
import useImage from "use-image";


function Editor(props) {
    const [PowerSocketImg, PowerSocketstatus] = useImage("https://psv4.userapi.com/c534536/u189412517/docs/d17/e6c24d0c3678/powerSocket.png?extra=y8dbPxDBzbHrB6c1dY9tVzF0gVDWXzJdCAPlMd0FS6bhz_jdx1SLKDT4UqJkWpkbELscQw4I9zx_S_vsfeOIjVWb9h-YLfYfoz-zTuyc_NNgxL7YsdpDOzDmA6zVpkLnTUAlCzzBGykCSLC3WKbCDMs","Anonymous")
    const [SwitcherImg, SwitcherStatus] = useImage("https://sun9-21.userapi.com/impg/thvklK8x5Qmf5fsQPGK8iu9rC1Yrqs5UWSgC8A/jhIqlRHkNaQ.jpg?size=486x413&quality=96&sign=3cb26650d34a8f956a0cd8a7aa5b6ccc&type=album",'Anonymous')
    const [LampImg, LampStatus] = useImage("https://sun9-42.userapi.com/impg/KUCVGso6Oyr0E2NNuQWwduZuBcUm6lJ_uz7ZQw/yrZ8H5t2lQc.jpg?size=413x443&quality=96&sign=9af690b728385b82f516f16377a8b618&type=album","Anonymous")
    const formatQueue = queue => {
        return queue.map(el => {
            switch (el.type) {
                case "Line":
                    return (<Line x={el.x} y={el.y} key={el.id} ref={{current: null}} stroke="black"
                                  points={[0, 0, el.width, el.height]}/>)
                case "Rect":
                    return (<Rect x={el.x} y={el.y} key={el.id} ref={{current: null}} stroke="black" width={el.width}
                                  height={el.height}/>)
                case "PowerSocket":
                    return (<Image image={PowerSocketImg} x={el.x} y={el.y} key={el.id} ref={{current: null}} width={el.width}
                                   height={el.height}/>)
                case "Switcher":
                    return (<Image image={SwitcherImg} x={el.x} y={el.y} key={el.id} ref={{current: null}} width={el.width}
                                   height={el.height}/>)
                case "Lamp":
                    return (<Image image={LampImg} x={el.x} y={el.y} key={el.id} ref={{current: null}} width={el.width}
                                   height={el.height}/>)
                default:
                    break
            }
        })
    }
    const canvas = React.createRef()
    const layer = React.createRef()
    const shapeRef = useRef(null)
    let drawingNew = props.drawing
    const queue = formatQueue(props.queue)

    const [shape, setShape] = useState(null)
    const mouseDownHandler = e => {
        props.setDrawing(true)

        switch (props.currentShape) {
            case "Line":
                setShape(<Line
                    x={canvas.current.getPointerPosition().x}
                    y={canvas.current.getPointerPosition().y}
                    points={[0, 0, 0, 0]}
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

        switch (props.currentShape) {
            case "Line":
                setShape(<Line
                    x={shape.props.x}
                    y={shape.props.y}
                    closed
                    points={[0, 0, newWidth, newHeight]}
                    stroke="black"
                    ref={shapeRef}
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
        if (shape) {
            switch (props.currentShape) {
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
                    props.setMaterialCost(200)
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
                    props.setMaterialCost(150)
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
                    props.setMaterialCost(150)
                    break
            }
        }
        setShape(null)

    }
    const mouseOutHandler = e => {
        if (drawingNew) {
            props.setDrawing(false)
            setShape(null)
        }

    }
    const debug = e => {
        debugger


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
        const f = canvas.current.toDataURL({pixelRatio: 2})
        console.log(f)
    }
    const clearQueue = () =>
        props.clearQueue()

    return (
        <div className={s.editor}>
            <Toolbar setCurrentShape={props.setCurrentShape} shapes={props.shapes} debug={debug} save={save} clearQueue={clearQueue}/>

            <div>
                <InfoPanel materialCost={props.materialCost} workCost={props.workCost}/>
                <div onMouseOut={mouseOutHandler}>
                    <Stage
                        className={s.canvas}
                        ref={canvas}
                        width={1000}
                        height={1000}
                        onMouseDown={mouseDownHandler}
                        onMouseUp={mouseUpHandler}
                        onMousemove={mouseMoveHandler}
                    >
                        <Layer ref={layer}>
                            {queue}
                            {shape}
                        </Layer>
                    </Stage>
                </div>
            </div>
        </div>
    );
}

export default Editor;