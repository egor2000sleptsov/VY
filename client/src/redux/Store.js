import {combineReducers, createStore} from "redux";
import editorReducer from "./EditorReducer";

let reducers = combineReducers({
    editor: editorReducer
})

let store = createStore(reducers)

window.store = store
export default store