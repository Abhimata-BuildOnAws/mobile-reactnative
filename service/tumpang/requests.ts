import axios from 'axios';

export const getHitch = async () => {
    try {
        const { data } = await axios.post("/tumpang/browse", {
            user_id: "fc7ac8a0-3b01-4765-91b2-30c977ba37d2"
        })
        console.log(data);
        
        return data
    }catch (e) {
        return e.response
    }
}