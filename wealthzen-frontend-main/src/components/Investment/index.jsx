import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

Investment.propTypes = {};

function Investment(props) {
    const investment = useSelector((state) => state.investment);

    const checkInvestment = (value) => {
        if (value <= -0.5) {
            return {
                text: 'low',
                class: 'iconw-triangle-right inline-flex text-icon ml-1 align-middle rotate-90',
                icon: '',
            };
        } else if (value >= -0.5 && value < 0.5) {
            return {
                text: 'med',
                class: 'ml-1',
                icon: '-',
            };
        } else {
            return {
                text: 'high',
                class: 'iconw-triangle-right inline-flex text-icon ml-1 mb-1 align-middle rotate-265',
                icon: '',
            };
        }
    };

    const volatility = checkInvestment(investment.volatility);
    const ttr = checkInvestment(investment.ttr);
    const risk = checkInvestment(investment.risk);

    return (
        <ul className='risk flex justify-center px-6 py-2 bg-white rounded-lg mx-auto'>
            <li className='mr-6 text-sm font-semibold text-second flex flex-col md:flex-row leading-19'>
                <label htmlFor=''>Volatility</label>
                <p
                    className={`leading-18 md:ml-2 capitalize font-normal text-${volatility.text}`}
                >
                    {volatility.text}
                    <i className={volatility.class}>{volatility.icon}</i>
                </p>
            </li>
            <li className='mr-6 text-sm font-semibold text-second flex flex-col md:flex-row leading-19'>
                <label htmlFor=''>Time to Returns</label>
                <p
                    className={`leading-18 md:ml-2 capitalize font-normal text-${ttr.text}`}
                >
                    {ttr.text}
                    <i className={ttr.class}>{ttr.icon}</i>
                </p>
            </li>
            <li className='text-sm font-semibold text-second flex flex-col md:flex-row leading-19'>
                <label htmlFor=''>Risk</label>
                <p
                    className={`leading-18 md:ml-2 capitalize font-normal text-${risk.text}`}
                >
                    {risk.text}
                    <i className={risk.class}>{risk.icon}</i>
                </p>
            </li>
        </ul>
    );
}

export default Investment;
