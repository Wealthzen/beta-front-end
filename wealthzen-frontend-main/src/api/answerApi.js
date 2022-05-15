import axiosClient from './axiosClient';

const answerApi = {
    getAll(params) {
        const url = 'answers';
        return axiosClient.get(url, { params });
    },

    add(data, userId) {
        const url = 'answers';
        const value = {
            userId: userId,
            questionId: data.questionId,
            questionText: data.questionText,
            answerValue: data.answerValue,
            answerText: data.answerText,
            portfolioAttributes: '',
            investment: null,
        };
        return axiosClient.post(url, value);
    },
};

export default answerApi;
