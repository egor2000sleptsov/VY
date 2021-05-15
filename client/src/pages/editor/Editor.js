import React, {useEffect, useRef, useState} from 'react';
import s from './Editor.module.css'
import {Image, Layer, Line, Rect, Stage} from "react-konva";
import Toolbar from "./Toolbar/Toolbar";
import InfoPanel from "./InfoPanel/InfoPanel";
import useImage from "use-image";
import {jsPDF} from "jspdf"


function Editor(props) {
    const [PowerSocketImg] = useImage("https://psv4.userapi.com/c536436/u189412517/docs/d5/00d6f2b582bb/powerSocket.png?extra=lEKjEv3fDS6VHCBtDD9t1M9grxSRXRtQXNW3_KghL2dg61qIcfScRy2gOB_OjoLmVvboMvqoTfZEMdCQS_8jJinGGJBJL6yxkIPB2EWxWrjT7uhobwb98RvXXQt7Xha1CiSEP8dbL-Do2WktKYs", "Anonymous")
    const [SwitcherImg] = useImage("https://psv4.userapi.com/c536436/u189412517/docs/d50/11dae852001a/switcher.png?extra=pyKQ_FdAe7GYI5yQ2QMIuYqQo-twTb85cyK4FykRffjcCvB8BiLWriaz8l2RbVwt-TarpwSzFRGYLgFH7WMcD3iDf5j3gLoDPtpDGxhd0nxcsvSqSiQdGoyJIdFwoWbGK4hQD1JFWGHrNBgdqvQ", 'Anonymous')
    const [LampImg] = useImage("https://psv4.userapi.com/c536436/u189412517/docs/d12/3da79db38565/lamp.png?extra=St3ogL3iy0WPrv8DLMIOi9tZa3n_py5N9UVyM25kIQ2A1ZDeArq4HX4qcUv20FTNO7I3Ms88UFnPMdueVemKYMbgtrltPfPCG5P96MZbT6xMVCWlg7IuVMgHEsAuLgYrz8k8SFwWqZANyMHVPNU", "Anonymous")
    const formatQueue = queue => {
        return queue.map(el => {
            switch (el.type) {
                case "Line":
                    return (<Line x={el.x} y={el.y} key={el.id} ref={{current: null}} stroke="black"
                                  points={[0, 0, el.width, el.height]} draggable={true} onDragStart={dragStart}/>)
                case "Rect":
                    return (<Rect x={el.x} y={el.y} key={el.id} ref={{current: null}} stroke="black" width={el.width}
                                  height={el.height}/>)
                case "PowerSocket":
                    return (<Image image={PowerSocketImg} x={el.x} y={el.y} key={el.id} ref={{current: null}}
                                   width={el.width}
                                   height={el.height} draggable={true} onDragStart={dragStart}/>)
                case "Switcher":
                    return (
                        <Image image={SwitcherImg} x={el.x} y={el.y} key={el.id} ref={{current: null}} width={el.width}
                               height={el.height} draggable={true} onDragStart={dragStart}/>)
                case "Lamp":
                    return (<Image image={LampImg} x={el.x} y={el.y} key={el.id} ref={{current: null}} width={el.width}
                                   height={el.height} draggable={true} onDragStart={dragStart}/>)
                default:
                    return null
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

        switch (props.currentShape.type) {
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

        switch (props.currentShape.type) {
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
        let pdf = new jsPDF('l','px',[canvas.current.width(),canvas.current.height()])
        pdf.setTextColor('#000000')
        pdf.addImage(
            canvas.current.toDataURL({pixelRatio:2}),
            0,
            0,
            canvas.current.width(),
            canvas.current.height(),
        )
        pdf.save("canvas.pdf")
    }
    const clearQueue = () =>
        props.clearQueue()

    return (
        <div className={s.editor}>
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