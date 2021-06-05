import axios from "./index";

export const getById = async id => {
    try {
        return  await axios.post('api/application', {
            method: "receive",
            submethod: "byId",
            id: id
        })
            .then(res => {
                return res.data
        })
    }
    catch (e) {
        console.log(e)
    }
}
