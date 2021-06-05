import axios from "./index.js";

export const getAllApp = async  () => {
    try {
        // const response = await axios.post('/api/application', {
        //     method: "receive",
        //     submethod: "all"
        // })
        // const {data} = response
        // return data
        return await axios.post('/api/application', {
            method: "receive",
            submethod: "all"
        })
            .then(res => {
                return res.data
            })
    } catch (e) {
        console.log(e)
    }
}
