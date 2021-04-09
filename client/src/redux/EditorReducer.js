const setCurrentCoordinate = 'setCurrentCoordinate'

let initialState = {
    currentShape: null,
    coordinate: {
        x: 0,
        y: 0
    },
    currentCoordinate: {
        x: 0,
        y: 0
    },
    queue: [],
}

const editorReducer = (state = initialState, action) => {
    switch (action.type) {
        case setCurrentCoordinate:
            let copyState = {...state}
            copyState.currentCoordinate.x = action.coordinate.x
            copyState.currentCoordinate.y = action.coordinate.y
            return copyState
        default:
            return state
    }
}

export const setCurrentCoordinateActionCreater = (value) => ({type: setCurrentCoordinate, value: value})
export default editorReducer