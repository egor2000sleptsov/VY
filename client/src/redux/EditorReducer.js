const setDrawing = 'setDrawing'
const setCurrentShape = 'setCurrentShape'
const setQueue = 'setQueue'
const delLastFromQueue = 'delLastFromQueue'
const addLastFromBufferedShapes = 'addLastFromBufferedShapes'
const setMaterialCost = 'setMaterialCost'
const clearQueue = 'ClearQueue'
const setCost = 'setCost'


let initialState = {
    bufferedShapes: [],
    currentShape: {
        type: "Line",
        workCost: 0,
        materialCost: 0
    },
    drawing: false,
    queue: [],
    shapes: [
        {
            name: "Линия",
            type: "Line",
            workCost: 0,
            materialCost: 0
        },
        {
            name: "Прямоугольник",
            type: "Rect",
            workCost: 0,
            materialCost: 0
        },
        {
            name: "Розетка",
            type: "PowerSocket",
            workCost: 500,
            materialCost: 200
        },
        {
            name: "Переключатель",
            type: "Switcher",
            workCost: 700,
            materialCost: 250
        },
        {
            name: "Светильник",
            type: "Lamp",
            workCost: 750,
            materialCost: 150
        }
    ],
    materialCost: 0,
    workCost: 0
}

const editorReducer = (state = initialState, action) => {
    let stateCopy = {
        ...state,
        queue: [...state.queue],
        shapes: [...state.shapes]
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
            if (stateCopy.queue.length > 0) {
                const tmp = stateCopy.queue.pop()
                stateCopy.materialCost = stateCopy.materialCost - stateCopy.shapes.find(el => el.type === tmp.type).materialCost
                stateCopy.workCost = stateCopy.workCost - stateCopy.shapes.find(el => el.type === tmp.type).workCost
                stateCopy.bufferedShapes = [...stateCopy.bufferedShapes, tmp]

            }
            return stateCopy
        case addLastFromBufferedShapes:
            if (stateCopy.bufferedShapes.length > 0) {
                const tmp = stateCopy.bufferedShapes.pop()
                stateCopy.materialCost = stateCopy.materialCost + stateCopy.shapes.find(el => el.type === tmp.type).materialCost
                stateCopy.workCost = stateCopy.workCost + stateCopy.shapes.find(el => el.type === tmp.type).workCost
                stateCopy.queue = [...stateCopy.queue, tmp]
            }
            return stateCopy
        case setMaterialCost:
            stateCopy.materialCost = stateCopy.materialCost + action.value
            return stateCopy
        case clearQueue:
            stateCopy.queue = []
            stateCopy.materialCost = 0
            stateCopy.workCost = 0
            return stateCopy
        case setCost:
            stateCopy.workCost = stateCopy.workCost + stateCopy.currentShape.workCost
            stateCopy.materialCost = stateCopy.materialCost + stateCopy.currentShape.materialCost
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
export const setCostActionCreator = () => ({type: setCost})


export default editorReducer