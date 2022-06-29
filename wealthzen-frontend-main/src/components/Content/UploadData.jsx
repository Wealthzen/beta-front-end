import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axiosClient from '../../api/axiosClient';

const UploadData = () => {
    const [loading, setLoading] = useState(true);
    const userData = useSelector(store => store.user);
    const answers = useSelector(store => store.currentAnswers);
    const allQuestions = useSelector(store => store.questions);

    
    let filteredAnswers = answers.map(answer => ({
            question_id: allQuestions.find(question => question.order === answer.questionId)._id,
            answer: answer.answer
        }));

        
    useEffect(() => {
        axiosClient.post('/answers', {
            name: userData.name,
            email: userData.email,
            answers: filteredAnswers
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, [filteredAnswers, userData]);

    const reload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 3000)
    }

    return (
        <>
            {loading ? (<div>Loading...</div>) : (
                <>
                <p>Have a Nice Day, We are evaluating your choices</p>
                {reload()}
                </>
            )}
        </>
    )
}

export default UploadData