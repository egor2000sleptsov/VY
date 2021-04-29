const setCoordinate = 'setCoordinate'
const setCurrentCoordinate = 'setCurrentCoordinate'
const setDrawing = 'setDrawing'

let initialState = {
    currentShape: "Line",
    drawing: false,
    coordinate: {
        x: 0,
        y: 0
    },
    currentCoordinate: {
        x: 0,
        y: 0
    },
    queue: [1, 2],
    shapes: [
        "Стена",
        "Прямоугольник"
    ]
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
        case setDrawing:
            stateCopy.drawing = action.value
        default:
            return state
    }
}

export const setCoordinateActionCreater = (value) => ({type: setCoordinate, value: value})
export const setCurrentCoordinateActionCreater = (value) => ({type: setCurrentCoordinate, value: value})
export const setDrawingActionCreator = (value) => ({type: setDrawing, value: value})
export default editorReducer