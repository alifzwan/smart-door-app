import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const lockRoom = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/lock`)
        return response.data
    } catch (error) {
        console.error('Error locking room:', error)
        throw error
    }
}

const unlockRoom = async () => {
    try{
        const response = await axios.post(`${BASE_URL}/unlock`);
        return response.data
    } catch (error) {
        console.error('Error unlocking room:', error);
    }
}

const getStatus = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/status`);
        return response.data;
    } catch (error) {
        console.error('Error fetching status:', error);
        throw error;
    }
}

export { lockRoom, unlockRoom, getStatus };