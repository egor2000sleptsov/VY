const setCoordinate = 'setCoordinate'
const setCurrentCoordinate = 'setCurrentCoordinate'

let initialState = {
    currentShape: "Line",
    coordinate: {
        x: 0,
        y: 0
    },
    currentCoordinate: {
        x: 0,
        y: 0
    },
    queue: [1, 2],
}

const editorReducer = (state = initialState, action) => {
    let stateCopy = {
        ...state,
        coordinate: {...state.coordinate},
        currentCoordinate: {...state.currentCoordinate},
        queue: []
    }

    switch (action.type) {
        case setCoordinate:
            stateCopy.coordinate.x = action.value.x
            stateCopy.coordinate.y = action.value.y
            stateCopy.currentCoordinate.x = action.value.x
            stateCopy.currentCoordinate.y = action.value.y
            return stateCopy
        case setCurrentCoordinate:
            stateCopy.currentCoordinate.x = action.value.x
            stateCopy.currentCoordinate.y = action.value.y
            return stateCopy
        default:
            return state
    }
}

export const setCoordinateActionCreater = (value) => ({type: setCoordinate, value: value})
export const setCurrentCoordinateActionCreater = (value) => ({type: setCurrentCoordinate, value: value})
export default editorReducer