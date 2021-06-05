import axios from "./index";

export const getById = async id => {
    try {
        const response = await axios.post('api/application', {
            method: "receive",
            submethod: "byId",
            id: "60b8a187a9b2b70bac19ba03" //todo
        })
            .then(res => {
            console.log(res.data)
        })
    }
    catch (e) {
        console.log(e)
    }
}
