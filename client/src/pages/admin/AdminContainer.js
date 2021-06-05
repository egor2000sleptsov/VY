import {connect} from "react-redux";
import Admin from "./Admin";
import {setAuthActionCreator} from "../../redux/AdminReducer";

let mapStateToProps = (store) => {
    return {
        isAuth: store.admin.isAuth,
        applications: store.admin.applications
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setAuth: value => dispatch(setAuthActionCreator(value)),
    }
}
const AdminContainer = connect(mapStateToProps, mapDispatchToProps)(Admin)

export default AdminContainer
