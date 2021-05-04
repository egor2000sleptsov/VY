import {connect} from "react-redux";
// import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
// import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import Editor from "./Editor";
import {
    addLastFromBufferedShapesActionCreator,
    delLastFromQueueActionCreator,
    setCurrentShapeActionCreator,
    setDrawingActionCreator,
    setQueueActionCreator
} from "../../redux/EditorReducer";

let mapStateToProps = (store) => {
    return {
        queue: [...store.editor.queue],
        currentShape: store.editor.currentShape,
        shapes: [...store.editor.shapes],
        drawing: store.editor.drawing
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setDrawing: value => dispatch(setDrawingActionCreator(value)),
        setQueue: value => dispatch(setQueueActionCreator(value)),
        setCurrentShape: value => dispatch(setCurrentShapeActionCreator(value)),
        delLastFromQueue: () => dispatch(delLastFromQueueActionCreator()),
        addLastFromBufferedShapes: () => dispatch(addLastFromBufferedShapesActionCreator()),
    }
}
const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor)

export default EditorContainer