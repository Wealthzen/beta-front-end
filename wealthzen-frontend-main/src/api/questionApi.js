import axiosClient from './axiosClient';

const questionApi = {
    getAll(params) {
        const url = 'questions';
        return axiosClient.get(url, { params });
    },

    add(data) {
        const url = 'questions';
        return axiosClient.post(url, data);
    },
};

export default questionApi;
