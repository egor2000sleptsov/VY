const setDrawing = 'setDrawing'
const setCurrentShape = 'setCurrentShape'
const setQueue = 'setQueue'
const delLastFromQueue = 'delLastFromQueue'
const addLastFromBufferedShapes = 'addLastFromBufferedShapes'


let initialState = {
    bufferedShapes: [],
    currentShape: "Line",
    drawing: false,
    queue: [],
    shapes: [
        "Line",
        "Rect"
    ],
    materialCost: 2999,
    workCost: 90909
}

const editorReducer = (state = initialState, action) => {
    let stateCopy = {
        ...state,
        coordinate: {...state.coordinate},
        currentCoordinate: {...state.currentCoordinate},
        queue: [...state.queue]
    }

    switch (action.type) {
        case setDrawing:
            stateCopy.drawing = action.value
            return stateCopy
        case setCurrentShape:
            stateCopy.currentShape = action.value
            return stateCopy
        case setQueue:
            stateCopy.queue = [...stateCopy.queue, {...action.value}]
            stateCopy.bufferedShapes = []
            return stateCopy
        case delLastFromQueue:
            if (stateCopy.queue.length > 0)
                stateCopy.bufferedShapes = [...stateCopy.bufferedShapes, stateCopy.queue.pop()]
            return stateCopy
        case addLastFromBufferedShapes:
            if (stateCopy.bufferedShapes.length > 0)
                stateCopy.queue = [...stateCopy.queue, stateCopy.bufferedShapes.pop()]
            return stateCopy
        default:
            return state
    }
}

export const setDrawingActionCreator = value => ({type: setDrawing, value: value})
export const setCurrentShapeActionCreator = value => ({type: setCurrentShape, value: value})
export const setQueueActionCreator = value => ({type: setQueue, value: value})
export const delLastFromQueueActionCreator = () => ({type: delLastFromQueue})
export const addLastFromBufferedShapesActionCreator = () => ({type: addLastFromBufferedShapes})


export default editorReducer