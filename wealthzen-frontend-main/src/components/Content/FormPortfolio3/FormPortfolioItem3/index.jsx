import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

FormPortfolioItem3.propTypes = {
    dataItem: PropTypes.object,
};

FormPortfolioItem3.defaultProps = {
    dataItem: {},
};

function FormPortfolioItem3(props) {
    const { dataItem } = props;

    return (
        <div className='item'>
            <div className='before-content'>
                <h3>{dataItem.itemTitle}</h3>
                <p>{dataItem.description}</p>
                <Link to='#'>{dataItem.reveal}</Link>
            </div>
            <p className='seperate'>
                <i className='iconw-arrow-top'></i>
            </p>
            <div className='after-content'>
                <ul className='table'>
                    <li>
                        <p>
                            Index <Link to='#'>ETFs</Link>
                            <label>{dataItem.etf}</label>
                        </p>
                        <p>{dataItem.index}%</p>
                    </li>
                    <li>
                        <p>Tech stocks</p>
                        <p>{dataItem.tech}%</p>
                    </li>
                    <li>
                        <p>Bonds</p>
                        <p>{dataItem.bonds}%</p>
                    </li>
                    <li>
                        <p>RE funds</p>
                        <p>{dataItem.reFunds}%</p>
                    </li>
                    <li>
                        <p>Gold</p>
                        <p>{dataItem.gold}%</p>
                    </li>
                </ul>
                <ul className='risk'>
                    <li>
                        <label htmlFor=''>Volatility</label>
                        <span>{dataItem.volatility}</span>
                    </li>
                    <li>
                        <label htmlFor=''>Time to Returns</label>
                        <span>{dataItem.timeToReturn}</span>
                    </li>
                    <li>
                        <label htmlFor=''>Risk</label>
                        <span>{dataItem.risk}</span>
                    </li>
                </ul>
            </div>
            <button>
                {dataItem.buttonText}
                <i className='iconw-arrow-right'></i>
            </button>
        </div>
    );
}

export default FormPortfolioItem3;
