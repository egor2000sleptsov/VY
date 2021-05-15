import {connect} from "react-redux";
// import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
// import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import Editor from "./Editor";
import {
    addLastFromBufferedShapesActionCreator, clearQueueActionCreator,
    delLastFromQueueActionCreator, setCostActionCreator,
    setCurrentShapeActionCreator,
    setDrawingActionCreator, setMaterialCostActionCreator,
    setQueueActionCreator
} from "../../redux/EditorReducer";

let mapStateToProps = (store) => {
    return {
        queue: [...store.editor.queue],
        currentShape: store.editor.currentShape,
        drawing: store.editor.drawing,
        materialCost: store.editor.materialCost,
        workCost: store.editor.workCost,
        shapes: [...store.editor.shapes]
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setDrawing: value => dispatch(setDrawingActionCreator(value)),
        setQueue: value => dispatch(setQueueActionCreator(value)),
        setCurrentShape: value => dispatch(setCurrentShapeActionCreator(value)),
        delLastFromQueue: () => dispatch(delLastFromQueueActionCreator()),
        addLastFromBufferedShapes: () => dispatch(addLastFromBufferedShapesActionCreator()),
        setMaterialCost: value => dispatch(setMaterialCostActionCreator(value)),
        clearQueue: () => dispatch(clearQueueActionCreator()),
        setCost: () => dispatch(setCostActionCreator()),
    }
}
const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor)

export default EditorContainer