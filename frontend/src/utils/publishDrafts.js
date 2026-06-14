import axios from 'axios';
import { serverUrl } from '../App';

export const publishAllDrafts = async () => {
    try {
        const res = await axios.post(`${serverUrl}/api/course/publishalldrafts`, {}, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error('publishAllDrafts error', error);
        throw error;
    }
};

export default publishAllDrafts;
