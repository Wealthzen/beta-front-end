import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

FormPortfolioRate.propTypes = {
    data: PropTypes.object,
};

FormPortfolioRate.defaultProps = {
    data: {},
};

function FormPortfolioRate(props) {
    const { data } = props;
    const selectedPortfolio = useSelector((state) => state.selectedPortfolio)

    return (
        <table className='bg-porfolio border-separate max-w-1152 w-full mx-auto rounded-10 pl-24 p-45'>
            <tbody>
                <tr>
                    <td className='pb-17 w-1/4 text-table text-14 leading-19 font-semibold'></td>
                    <td className='pb-17 px-45 text-center text-second'>Annualized Return (%)</td>
                    <td className='pb-17 px-45 text-center text-second'>Annualized Volatility (%)</td>
                    <td className='pb-17 px-45 text-center text-second'>Sharpe Ratio</td>
                    <td className='pb-17 px-45 text-center text-second'>Allocation (%)</td>
                </tr>
            
                {
                    selectedPortfolio.items.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className='py-17 pb-5 pb-5 border-t border-input-border text-table text-14 leading-19 font-semibold'>{item.asset_ticker}</td>
                                <td className='py-17 px-45 pb-5 border-t border-input-border text-center text-second'>{(item.annualized_return*100).toFixed(2)}</td>
                                <td className='py-17 px-45 pb-5 border-t border-input-border text-center text-second'>{(item.annualized_vol*100).toFixed(2)}</td>
                                <td className='py-17 px-45 pb-5 border-t border-input-border text-center text-second'>{(item.sharpe_ratio).toFixed(2)}</td>
                                <td className='py-17 px-45 pb-5 border-t border-input-border text-center text-second'>{(item.allocation*100).toFixed(2)}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

export default FormPortfolioRate;
