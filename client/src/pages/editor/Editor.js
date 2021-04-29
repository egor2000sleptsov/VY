import React, {useEffect, useRef, useState} from 'react';
import s from './Editor.module.css'
// import ButtonShape from "./ButtonShape/ButtonShape";
import {Layer, Line, Rect, Stage} from "react-konva";


function Editor(props) {
    const canvas = React.createRef()
    const layer = React.createRef()
    const shapeRef = useRef(null)
    const [drawing, setDrawing] = useState(props.drawing)
    const [queue, setQueue] = useState([])
    const [shape, setShape] = useState(null)

    const mouseDownHandler = (e) => {
        setDrawing(true)
        props.setDrawing(!drawing)


        setShape(<Rect
            x={canvas.current.getPointerPosition().x}
            y={canvas.current.getPointerPosition().y}
            width={0}
            height={0}
            stroke="black"
            ref={shapeRef}
        />)

    }
    const mouseMoveHandler = (e) => {
        if (!drawing) return false
        const newWidth = canvas.current.getPointerPosition().x - shape.props.x
        const newHeight = canvas.current.getPointerPosition().y - shape.props.y
        setShape(<Rect
            x={shape.props.x}
            y={shape.props.y}
            width={newWidth}
            height={newHeight}
            stroke="black"
            ref={shapeRef}
        />)
        shapeRef.current.to({
            width: canvas.current.getPointerPosition().x - shape.props.x,
            height: canvas.current.getPointerPosition().y - shape.props.y
        })
        // const newWidth = canvas.current.getPointerPosition().x - shape.props.x
        // const newHeight = canvas.current.getPointerPosition().y - shape.props.y
        // setShape(<Rect
        //     x={shape.props.x}
        //     y={shape.props.y}
        //     width={newWidth}
        //     height={newHeight}
        //     stroke="black"
        // />)
    }

    const mouseUpHandler = (e) => {
        setDrawing(false)
        props.setDrawing(!drawing)
        setQueue([...queue, shape])
        setShape(null)
    }

    const debug = () => {
        debugger
    }

    const mouseOut = () => {
        if (drawing) {
            setDrawing(false)
            props.setDrawing(!drawing)
            setShape(null)
        }
    };

    return (
        <div>
            <button onClick={debug}>debugger</button>
            <div onMouseOut={mouseOut}>
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