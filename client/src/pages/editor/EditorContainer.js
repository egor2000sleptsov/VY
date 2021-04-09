import {connect} from "react-redux";
// import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
// import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import Editor from "./Editor";
import {setCurrentCoordinateActionCreater} from "../../redux/EditorReducer";

let mapStateToProps = (state) => {
    return {
        queue: state.queue,
        currentShape: state.currentShape,
        coordinate: {...state.coordinate},
        currentCoordinate: {...state.currentCoordinate}
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        setCurrentCoordinate: (value) => {
            dispatch(setCurrentCoordinateActionCreater(value))
        }
    }
}
const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor)

export default EditorContainer