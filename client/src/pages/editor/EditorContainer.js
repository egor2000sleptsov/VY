import {connect} from "react-redux";
// import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
// import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import Editor from "./Editor";
import {
    setCoordinateActionCreater,
    setCurrentCoordinateActionCreater,
    setDrawingActionCreator
} from "../../redux/EditorReducer";

let mapStateToProps = (store) => {
    return {
        // queue: [...store.queue],
        queue: store.editor.queue,
        currentShape: store.editor.currentShape,
        coordinate: {...store.editor.coordinate},
        currentCoordinate: {...store.editor.currentCoordinate},
        shapes: [...store.editor.shapes],
        drawing: store.editor.drawing
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setCoordinate: value => dispatch(setCoordinateActionCreater(value)),
        setCurrentCoordinate: value => dispatch(setCurrentCoordinateActionCreater(value)),
        setDrawing: value => dispatch(setDrawingActionCreator(value))
    }
}
const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor)

export default EditorContainer