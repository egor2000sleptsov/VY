const setAuth = "setAuth"


let initialState = {
    data: [

    ],
    auth: false
}

const AdminReducer = (state = initialState, action) => {
    let stateCopy = {
        ...state,
        data: [...state.data]
    }

    switch (action.type) {
        case setAuth:

            return stateCopy
    }




}
