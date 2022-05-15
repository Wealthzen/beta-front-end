import React from 'react';
import PropTypes from 'prop-types';

FormPickMultipleItem.propTypes = {
    dataItem: PropTypes.object,
    style: PropTypes.number,
};

FormPickMultipleItem.defaultProps = {
    dataItem: {},
    style: 1,
};

function FormPickMultipleItem(props) {
    const { dataItem, style } = props;

    const figureStyle = () => {
        let classFigure = '';

        if (style === 1) {
            classFigure = 'mx-3 justify-center';
        } else if (style === 2) {
            classFigure = 'relative min-w-264 w-full min-h-291';
        } else {
            classFigure =
                'relative max-w-264 w-full min-h-291 justify-end flex-col';
        }
        return classFigure;
    };

    const inputStyle = () => {
        let classInput = '';

        if (style === 1) {
            classInput = '';
        } else if (style === 2) {
            classInput = 'absolute top-4 right-4';
        } else {
            classInput = 'absolute top-4 right-4';
        }
        return classInput;
    };

    const itemStyle = () => {
        let classItems = '';

        if (style === 1) {
            classItems = 'max-w-230 w-full mb-6';
        } else if (style === 2) {
            classItems = 'px-3 flex-33';
        } else {
            classItems = 'px-3 flex-25';
        }
        return classItems;
    };

    const labelStyle = () => {
        let classLabel = '';

        if (style === 1) {
            classLabel = 'text-left ml-4';
        } else if (style === 2) {
            classLabel = 'text-center w-full';
        } else {
            classLabel = 'text-center';
        }
        return classLabel;
    };

    return (
        <div className={`${itemStyle()}`}>
            <figure
                className={`flex h-full relative items-center px-8 py-6 border rounded-lg border-pink hover:shadow-focus active:bg-input cursor-pointer ${figureStyle()}`}
            >
                <div className={`${inputStyle()}`}>
                    <label className={`box`}>
                        <input
                            className={`radio-box cursor-pointer opacity-1 h-5 w-5 checked:bg-pink`}
                            type='checkbox'
                            name='multiple'
                        />
                        <span className='mark'></span>
                    </label>
                </div>

                {dataItem.imageUrl && <img src={dataItem.imageUrl} alt='' />}
                {dataItem.text && (
                    <label
                        className={`sub-input ${labelStyle()} text-lg leading-p text-second`}
                    >
                        {dataItem.text}
                    </label>
                )}
            </figure>
        </div>
    );
}

export default FormPickMultipleItem;
