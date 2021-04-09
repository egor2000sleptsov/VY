import React from 'react';

function Editor(props) {
    const editorRef = React.createRef()
    const test = () => {

    }

    const getCoordinates = (e, x1, y1) => {
        let ref = editorRef.current
        let x = e.pageX,
            y = e.pageY
        console.log(`${x - x1}:${y - y1}`)
    }
    return (
        <div>
            editor <br/>
            <div className="editor" style={{backgroundColor: "black"}}>
                <canvas id="editor" height="300" width="1200" style={{backgroundColor: "grey"}} ref={editorRef}
                        onClick={(event) => {
                            getCoordinates(event, editorRef.current.offsetLeft, editorRef.current.offsetTop)
                        }}>
                    Обнови браузер
                </canvas>
            </div>
            <button onClick={(event) => {
                getCoordinates(event, editorRef.current.offsetLeft, editorRef.current.offsetTop)
            }} onMouseMove={test}>click me
            </button>
        </div>
    );
}

export default Editor;