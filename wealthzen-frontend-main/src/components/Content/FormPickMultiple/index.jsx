import PropTypes from 'prop-types';
import React from 'react';
import { checkAnswerExisted } from '../../../app/utils';
import FormPickMultipleItem from './FormPickMultipleItem';

FormPickMultiple.propTypes = {
    data: PropTypes.object,
    allAnswer: PropTypes.array,
    style: PropTypes.number,
};

FormPickMultiple.defaultProps = {
    data: {},
    allAnswer: [],
    style: 1,
};

function FormPickMultiple(props) {
    const { data, allAnswer, style } = props;

    const formContent = () => {
        let classContent = '';

        if (style === 1) {
            classContent = 'max-w-690 flex-wrap justify-center';
        } else if (style === 2) {
            classContent = 'csss6';
        } else {
            classContent = 'csss7';
        }
        return classContent;
    };

    const button = () => {
        let classButton = '';

        if (style === 1) {
            classButton = 'mt-2';
        } else {
            classButton = 'mt-8';
        }
        return classButton;
    };

    const selected = () => {
        return checkAnswerExisted(data, allAnswer);
    };

    return (
        <div
            className={`form-style form-multiple form-style-${style} text-center`}
        >
            {data.imageUrl && <img src={data.imageUrl} alt='' />}
            {data.title && (
                <h2 className='pb-8 text-center text-4xl font-semibold'>
                    {data.title}
                </h2>
            )}
            <div className={`${formContent()} flex`}>
                {data.choices.map((item, index) => (
                    <FormPickMultipleItem
                        key={index}
                        dataItem={item}
                        // selected={selected()}
                        style={style}
                    />
                ))}
            </div>
            {data.buttonText && (
                <button
                    className={`button text-sm font-semibold px-6 py-2 bg-pink text-white leading-h2 rounded-input ${button()}`}
                >
                    {data.buttonText}
                    <i className='iconw-arrow-right text-icon ml-2.5 text-icon align-middle'></i>
                </button>
            )}
        </div>
    );
}

export default FormPickMultiple;
