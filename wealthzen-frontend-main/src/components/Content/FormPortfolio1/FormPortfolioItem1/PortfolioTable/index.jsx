import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

PortfolioTable.propTypes = {
    items: PropTypes.object,
    index: PropTypes.number,
};

PortfolioTable.defaultProps = {
    items: {},
    index: 0,
};
function PortfolioTable(props) {
    const { items, index } = props;
    const [showEtf, setShowEtf] = useState('hidden');

    const handleShowEtf = () => {
        setShowEtf('');
    };

    const handleHideEtf = () => {
        setShowEtf('hidden');
    };

    return (
        <li className='flex relative text-14 font-semibold leading-19 justify-between py-2 border-b border-input-border'>
            <p
                className='relative'
                onMouseEnter={handleShowEtf}
                onMouseLeave={handleHideEtf}
            >
                {/* <Link to='#' className='font-bold leading-17'> */}
                {items.asset_ticker}
                {/* </Link> */}
                <label
                    className={`absolute top-top-21 left-auto z-10 ml-2.5 text-left text-ticket rounded-md p-2 bg-white leading-14 w-32 ${showEtf}`}
                >
                    {items.asset_name}
                </label>
            </p>

            <p>
                {items.allocation > 0.1
                    ? Math.round(items.allocation * 100)
                    : (items.allocation*100).toFixed(2)}
                %
            </p>
        </li>
    );
}

export default PortfolioTable;
