import React from 'react';
import { useSelector } from 'react-redux';

function FormHello(props) {
    const userData = useSelector((state) => state.user);

    return (
        <div>
            <h2 className='text-4xl font-semibold leading-49'>
                Hey There <span className='text-pink'>{userData.name}</span>!
            </h2>
        </div>
    );
}

export default FormHello;
