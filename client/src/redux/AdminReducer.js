const setAuth = "setAuth"


let initialState = {
    applications: [],
    isAuth: false
}

const AdminReducer = (state = initialState, action) => {
    let stateCopy = {
        ...state
    }

    switch (action.type) {
        case setAuth:
            if (action.value === "pass")
                stateCopy.isAuth = true
            return stateCopy
        default:
            return state
    }
}

export const setAuthActionCreator = value => ({type: setAuth, value: value})


export default AdminReducer
