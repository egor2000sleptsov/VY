import React from 'react';
import s from './Editor.module.css'

function Editor(props) {
    const editorRef = React.createRef()

    //Присваивание начальных координат
    const setCoordinates = (e, x1, y1) => {
        // let ref = editorRef.current
        let x = e.pageX,
            y = e.pageY
        console.log(`${x - x1}:${y - y1}`)
        props.setCoordinate({x: x - x1, y: y - y1})
    }
    //Присваивание текущих координат
    const setCurrentCoordinates = (e, x1, y1) => {
        // let ref = editorRef.current
        if (e.buttons === 1){
            let x = e.pageX,
                y = e.pageY
            console.log(`${x - x1}:${y - y1}`)
            console.log(e.buttons)
            props.setCurrentCoordinate({x: x - x1, y: y - y1})
        }
        // props.setCurrentCoordinate({x:x-x1,y:y-y1})
    }

    return (
        <div>
            editor <br/>
            <div>
                <canvas id="editor" className={s.editor} height="300" width="900" ref={editorRef}
                        onClick={(event) => {
                            setCoordinates(event, editorRef.current.offsetLeft, editorRef.current.offsetTop)
                        }}

                        onMouseMove={(event) => {
                            setCurrentCoordinates(event, editorRef.current.offsetLeft, editorRef.current.offsetTop)
                        }}

                >
                    Обнови браузер
                </canvas>
            </div>
            <button onClick={(event) => {
                console.log(props)
            }}>click me
            </button>
        </div>
    );
}

export default Editor;