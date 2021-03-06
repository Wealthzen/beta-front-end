import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuestion } from '../../../app/currentQuestionSlice';
import { checkAvailableQuestion, getNextQuestion, uploadResults } from '../../../app/utils';

FormTextOnly.propTypes = {
    data: PropTypes.object,
};

FormTextOnly.defaultProps = {
    data: {},
};

function FormTextOnly(props) {
    const { data } = props;
    const dispath = useDispatch();

    const allQuestion = useSelector((state) => state.questions);
    const allAnswer = useSelector((state) => state.currentAnswers);
    const userData = useSelector((state) => state.user);

    // force next question
    const forceNextQuestion = (questionId, nextQuestion) => {
        if (nextQuestion === 'successfully') {
            const successfully = {
                type: 'SUCCESSFULLY',
                phase: 6,
            };

            uploadResults(userData, allAnswer);

            dispath(updateQuestion(successfully));
        } else {
            dispath(updateQuestion(nextQuestion));
        }
        
    };

    // force next question
    const questionId = data.order;
    const nextQuestion = getNextQuestion(allQuestion, questionId);

    // next question
    const handleNextQuestion = () => {
        // validate
        forceNextQuestion(questionId, nextQuestion);
    };
    const handleBackgroundClick = () => {
        // validate
        if (!data.button) {
            forceNextQuestion(questionId, nextQuestion);
        }
    };

    if (!data.button) {
        setTimeout(() => {
            forceNextQuestion(questionId, nextQuestion);
        }, 3000);
    }

    const styleDesc = () => {
        let classDescription = '';

        if (data.description) {
            classDescription = 'pt-2 text-second text-base';
        } else {
            classDescription = 'hidden';
        }

        return classDescription;
    };

    const styleSubmit = () => {
        let classBtn = '';
        if (data.button) {
            classBtn = 'ml-2.5';
        } else {
            classBtn = 'hidden';
        }

        return classBtn;
    };

    const styleButton = () => {
        let classBtn = '';
        if (data.button) {
            classBtn =
                'button text-sm font-semibold px-6 py-2 bg-pink text-white leading-h2 rounded-input';
        } else {
            classBtn = 'hidden';
        }

        return classBtn;
    };

    return (
        <div
            className='form-input text-center text-primary'
            onClick={handleBackgroundClick}
        >
            {data.image_url && (
                <div className='content-center'>
                    <img className='mx-auto' src={data.image_url} alt='' />
                </div>
            )}

            <h2 className='text-4xl font-semibold leading-49 px-3'>
                {data.question}
            </h2>

            {data.description && (
                <p className="pt-2 text-second text-base">{data.description}</p>
            )}

            {/* Displaying the intro page of wealthzen<->Aidha */}

            {/* <span class="inline-grid grid-cols-2 gap-4">
            <span>01</span>
            <span>02</span>
            </span>
            <span class="inline-grid grid-cols-2 gap-4">
            <span>01</span>
            <span>02</span>
            </span> */}

            {/* <div className={`grid gap-4 grid-cols-2 grid-rows-2`}>
                <div>
                    <p className='text-2xl font-semibold leading-49 px-3'>{data.choices!=null && data.choices[0].text}</p>
                    <p className={`${styleDesc()}`}>{data.choices!=null && data.choices[0].description}</p> <br/>
                </div>

                <div>
                    <p className='text-2xl font-semibold leading-49 px-3'>{data.choices!=null && data.choices[1].text}</p>
                    <p className={`${styleDesc()}`}>{data.choices!=null && data.choices[1].description}</p> <br/>
                </div>
                
            </div> */}

            <p className='text-2xl font-semibold leading-49 px-3'>{data.choices!=null && data.choices[0].text}</p>
            <p className={`${styleDesc()}`}>{data.choices!=null && data.choices[0].description}</p> <br/>
            <p className='text-2xl font-semibold leading-49 px-3'>{data.choices!=null && data.choices[1].text}</p>
            <p className={`${styleDesc()}`}>{data.choices!=null && data.choices[1].description}</p> <br/>
            <p className='text-2xl font-semibold leading-49 px-3'>{data.choices!=null && data.choices[2].text}</p>
            <p className={`${styleDesc()}`}>{data.choices!=null && data.choices[2].description}</p> <br/>

            <p className='pt-12'>
                <button onClick={handleNextQuestion} className={styleButton()}>
                    {data.button}
                    <i
                        className={`iconw-arrow-right text-icon ${styleSubmit()} align-middle`}
                    ></i>
                </button>
            </p>
        </div>
    );
}

export default FormTextOnly;
