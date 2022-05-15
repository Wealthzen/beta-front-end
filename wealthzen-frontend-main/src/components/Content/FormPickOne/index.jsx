import PropTypes from 'prop-types';
import { checkAnswerExisted } from '../../../app/utils';
import FormPickOneItem from './FormPickOneItem';

FormPickOne.propTypes = {
    data: PropTypes.object,
    allAnswer: PropTypes.array,
    style: PropTypes.number,
};

FormPickOne.defaultProps = {
    data: {},
    allAnswer: [],
    style: 1,
};

function FormPickOne(props) {
    const { data, allAnswer, style } = props;

    const selected = () => {
        return checkAnswerExisted(data, allAnswer);
    };

    return (
        <div className={`form-style form-style-${style}`}>
            {data.imageUrl && <img src={data.imageUrl} alt='' />}
            {data.question && (
                <h2 className='pb-8 text-center text-4xl font-semibold'>
                    {data.question}
                </h2>
            )}

            <div className='form-content flex justify-center flex-wrap'>
                {data.choices.map((item, index) => (
                    <FormPickOneItem
                        key={index}
                        dataItem={item}
                        questionId={data.id}
                        selected={selected()}
                        questionText={data.question}
                        style={style}
                    />
                ))}
            </div>
        </div>
    );
}

export default FormPickOne;
