import React, {useEffect, useRef, useState} from 'react';
import s from './Editor.module.css'
// import ButtonShape from "./ButtonShape/ButtonShape";
import {Layer, Line, Rect, Stage} from "react-konva";


function Editor(props) {
    const formatQueue = queue => {
        return queue.map(el => {
            switch (el.type) {
                case "Line":
                    return (<Line x={el.x} y={el.y} key={el.id} ref={{current: null}} stroke="black"
                                  points={[0, 0, el.width, el.height]}/>)
                case "Rect":
                    return (<Rect x={el.x} y={el.y} key={el.id} ref={{current: null}} stroke="black" width={el.width}
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
            }
        }
        setShape(null)
    }

    const mouseOutHandler = e => {
        if (drawingNew) {
            props.setDrawing(false)
            setShape(null)
        }
    };

    const debug = e => {
        debugger
    }

    const buttons = props.shapes.map(el => (
        <button onClick={() => props.setCurrentShape(el)} key={props.shapes.indexOf(el)}>{el}</button>))

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

    return (
        <div>
            <button onClick={debug}>debugger</button>
            {buttons}

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
    );
}

export default Editor;