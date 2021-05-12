const setDrawing = 'setDrawing'
const setCurrentShape = 'setCurrentShape'
const setQueue = 'setQueue'
const delLastFromQueue = 'delLastFromQueue'
const addLastFromBufferedShapes = 'addLastFromBufferedShapes'
const setMaterialCost = 'setMaterialCost'
const clearQueue = 'ClearQueue'



let initialState = {
    bufferedShapes: [],
    currentShape: "Line",
    drawing: false,
    queue: [],
    shapes: [
        "Line",
        "Rect",
        'PowerSocket',
        "Switcher",
        "Lamp"
    ],
    materialCost: 0,
    workCost: 7300
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
            if (stateCopy.queue.length > 0){
                if (stateCopy.queue[stateCopy.queue.length - 1].type === "PowerSocket")
                    stateCopy.materialCost = stateCopy.materialCost - 200
                else if (stateCopy.queue[stateCopy.queue.length - 1].type === "Switcher")
                    stateCopy.materialCost = stateCopy.materialCost - 150
                else if (stateCopy.queue[stateCopy.queue.length - 1].type === "Lamp")
                    stateCopy.materialCost = stateCopy.materialCost - 150
            }
            stateCopy.bufferedShapes = [...stateCopy.bufferedShapes, stateCopy.queue.pop()]
            return stateCopy
        case addLastFromBufferedShapes:
            if (stateCopy.bufferedShapes.length > 0)
                stateCopy.queue = [...stateCopy.queue, stateCopy.bufferedShapes.pop()]
            return stateCopy
        case setMaterialCost:
            stateCopy.materialCost = stateCopy.materialCost + action.value
            return stateCopy
        case clearQueue:
            stateCopy.queue = []
            stateCopy.materialCost = 0
            stateCopy.workCost = 0
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
export const setMaterialCostActionCreator = value => ({type: setMaterialCost, value: value})
export const clearQueueActionCreator = () => ({type: clearQueue})



export default editorReducer