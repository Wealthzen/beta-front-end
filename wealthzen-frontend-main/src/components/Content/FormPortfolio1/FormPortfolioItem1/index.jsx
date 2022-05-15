import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPhase } from '../../../../app/phaseSlice';
import PortfolioTable from './PortfolioTable';
import { selectPortfolio } from "../../../../app/selectedPortfolioSlice"

FormPortfolioItem1.propTypes = {
    dataItem: PropTypes.object,
};

FormPortfolioItem1.defaultProps = {
    dataItem: {},
};

function FormPortfolioItem1(props) {
    const { dataItem } = props;
    const dispatch = useDispatch();

    const [active, setActive] = useState('');

    const handleChangePhase = () => {
        dispatch(setPhase(3));
        dispatch(selectPortfolio(dataItem))
    };

    const handleMouseEnter = () => {
        setActive(' active');
    };

    const handleMouseLeave = () => {
        setActive('');
    };

    let volatility = 'med';
    if (dataItem.annualized_vol < 0.16) {
        volatility = 'low';
    } else if (dataItem.annualized_vol > 0.32) {
        volatility = 'high';
    }

    let ttr = 'med';
    if (dataItem.annualized_return < 0.05) {
        ttr = 'low';
    } else if (dataItem.annualized_return > 0.12) {
        ttr = 'high';
    }

    let risk = 'med';
    if (dataItem.risk_free_rate < 0.02) {
        risk = 'low';
    } else if (dataItem.risk_free_rate > 0.08) {
        risk = 'high';
    }

    return (
        <div
            className={`item mt-8 max-h-420 w-full mx-3 overflow-hidden ${active}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='max-h-420 before-content border pr-100 pl-92 text-center border-porfolio bg-porfolio rounded-lg h-full pt-40 flex flex-col justify-between'>
                <div>
                    <h3 className='text-2xl leading-8 font-semibold pb-4 leading-p'>
                        {dataItem.name}
                    </h3>
                    <p className='text-sm leading-18'></p>
                </div>

                <Link
                    to='#'
                    className='mb-35 text-sm text-pink underline font-semibold leading-h2'
                >
                    Reveal {dataItem.name}
                </Link>
            </div>

            <div className='max-h-420 after-content text-center border px-0 py-8 h-full border-porfolio bg-porfolio rounded-lg relative flex flex-col justify-between overflow-scroll'>
                <p className='absolute z-10 top-top-0.20 left-2/4 translate-x-center seperate text-center mt-top'>
                    <i
                        className='iconw-arrow-top text-icon2 bg-white px-3 py-4'
                        style={{
                            clipPath:
                                'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        }}
                    ></i>
                </p>
                <ul className='table max-w-full w-full px-12'>
                    {dataItem.items.map((item, index) => (
                        <PortfolioTable
                            key={index}
                            items={item}
                            index={index}
                        />
                    ))}
                </ul>
                <div>
                    <ul className='risk flex justify-center px-6 py-2 bg-white mt-12 rounded-lg max-w-400 mx-auto'>
                        <li className='mr-6 text-sm font-semibold leading-19 flex flex-wrap justify-center gap-2'>
                            <label htmlFor=''>Volatility</label>
                            <span
                                className={`inline-flex capitalize leading-18 font-normal text-${volatility}`}
                            >
                                {volatility}
                            </span>
                        </li>
                        <li className='mr-6 text-sm font-semibold leading-19 flex flex-wrap justify-center gap-2'>
                            <label htmlFor='' className='whitespace-nowrap'>
                                Time to Returns
                            </label>
                            <span
                                className={`inline-flex capitalize leading-18 font-normal text-${ttr}`}
                            >
                                {ttr}
                            </span>
                        </li>
                        <li className='text-sm font-semibold leading-19 flex flex-wrap justify-center gap-2'>
                            <label htmlFor=''>Risk</label>
                            <span
                                className={`inline-flex capitalize leading-18 font-normal text-${risk}`}
                            >
                                {risk}
                            </span>
                        </li>
                    </ul>
                    <button
                        onClick={handleChangePhase}
                        className='button text-sm font-semibold px-6 py-2 mt-6 bg-pink text-white leading-h2 rounded-input'
                    >
                        I want to {dataItem.name}
                        <i className='iconw-arrow-right text-icon ml-2.5 align-middle'></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormPortfolioItem1;
