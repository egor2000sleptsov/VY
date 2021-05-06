import React, {useEffect, useRef, useState} from 'react';
import s from './Editor.module.css'
// import ButtonShape from "./ButtonShape/ButtonShape";
import {Image, Layer, Line, Rect, Stage} from "react-konva";
import Toolbar from "./Toolbar/Toolbar";
import InfoPanel from "./InfoPanel/InfoPanel";
import useImage from "use-image";
import img from '../../images/powerSocket.png'


function Editor(props) {
    const [image, status] = useImage("https://psv4.userapi.com/c534536/u189412517/docs/d17/088e4dc9616b/powerSocket.png?extra=XeV1PSWUYxveJNLh15Yjg6Be_yg4NBU5tmsFspiNSbFBAzEQCNP6f5WaYUryFwpGYugaOtEzWa4s0rXgwn3IjSuSzbpjNPeODs9trCW9HZ42yhD_UcUnm0gyIa2P0aKt6VD7uDPIQLP0ekjbcigV")
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
                    return (<Image image={image} x={el.x} y={el.y} key={el.id} ref={{current: null}} width={el.width}
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
        console.log(img)
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
                    image={image}
                    x={canvas.current.getPointerPosition().x}
                    y={canvas.current.getPointerPosition().y}
                    width={0}
                    height={0}
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
                    image={image}
                    x={shape.props.x}
                    y={shape.props.y}
                    width={newWidth}
                    height={newHeight}
                    ref={shapeRef}
                />)
                console.log(shape)
                break
            default:
                break
        }

    }
    const mouseUpHandler = e => {
        props.setDrawing(false)
        if (shape) {
            switch (shape.type) {
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
                case "Image":
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

    return (
        <div className={s.editor}>
            <Toolbar setCurrentShape={props.setCurrentShape} shapes={props.shapes} debug={debug} save={save}/>

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