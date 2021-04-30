const setCoordinate = 'setCoordinate'
const setCurrentCoordinate = 'setCurrentCoordinate'
const setDrawing = 'setDrawing'
const setCurrentShape = 'setCurrentShape'
const setQueue = 'setQueue'


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
    queue: [{
        id: 0,
        type: "Line",
        x: 100,
        y: 100,
        width: 100,
        height: 100
    }],
    shapes: [
        "Line",
        "Rect"
    ]
}

const editorReducer = (state = initialState, action) => {
    let stateCopy = {
        ...state,
        coordinate: {...state.coordinate},
        currentCoordinate: {...state.currentCoordinate},
        queue: [...state.queue]
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
            return stateCopy
        case setCurrentShape:
            stateCopy.currentShape = action.value
            return stateCopy
        case setQueue:
            stateCopy.queue = [...stateCopy.queue, {...action.value}]
            return stateCopy
        default:
            return state
    }
}

export const setCoordinateActionCreater = value => ({type: setCoordinate, value: value})
export const setCurrentCoordinateActionCreater = value => ({type: setCurrentCoordinate, value: value})
export const setDrawingActionCreator = value => ({type: setDrawing, value: value})
export const setCurrentShapeActionCreator = value => ({type: setCurrentShape, value: value})
export const setQueueActionCreator = value => ({type: setQueue, value: value})

export default editorReducer