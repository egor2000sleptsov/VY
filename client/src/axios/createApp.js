import axios from "./index";

export const createApp = async (app) => {
    try {
        return await axios.post('api/application', {
            method: "send",
            app: JSON.stringify(app)
        })
            .then(res => res.data)
    }
    catch (e) {
        console.log(e)
    }
}
