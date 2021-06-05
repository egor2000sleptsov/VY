import {combineReducers, createStore} from "redux";
import editorReducer from "./EditorReducer";
import adminReducer from './AdminReducer'

let reducers = combineReducers({
    editor: editorReducer,
    admin: adminReducer
})

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store
export default store
