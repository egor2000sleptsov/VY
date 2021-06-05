import axios from "./index.js";

export const getAllApp = async  () => {
    try {
        return await axios.post('/api/application', {
            method: "receive",
            submethod: "all"
        })
            .then(res => res.data)
    } catch (e) {
        console.log(e)
    }
}
