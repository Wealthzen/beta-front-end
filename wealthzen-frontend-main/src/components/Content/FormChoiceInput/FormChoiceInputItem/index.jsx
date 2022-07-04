import React from 'react'
import { useEffect } from 'react';

const FormChoiceInputItem = ({ dataItem, selected, input, setInput, value, handleClick }) => {

    const selectedStyle = selected === dataItem.value ? 'bg-questionActive' : '';

    const handleInputChange = e => {
        dataItem?.form_variables?.input && setInput({ ...input, [e.target.name]: e.target.value });
        console.log(input);
    }
  return (
    <div className='item mb-6'>
        <figure
                className={`flex justify-center items-center flex-col border-1/2 border-pink cursor-pointer hover:shadow-focus h-full px-8 py-6 mx-3 rounded-lg ${selectedStyle}`}
                onClick={() => handleClick(dataItem.value)}
            >
                <input type='radio' name='single' className='hidden' />
                {dataItem.image_url && (
                    <img className='mx-auto' src={dataItem.image_url} alt='' />
                    )}
                {dataItem.text && (
                    <p className={`text-second leading-p mx-auto text-center text-lg`}>
                        {dataItem.text}
                    </p>
                )}
            </figure>
                {dataItem?.form_variables?.input ? (
                    <div className='flex justify-center items-center mt-2'>
                    <p>{dataItem.description}</p>
                    <input 
                        className='text-lg inline-table leading-5 mx-3 py-2.5 px-3 max-w-xs w-half placeholder:text-gray rounded-lg border-1/2 border-pink bg-neutral-100 outline-0 focus-visible:none'
                        type='number'
                        name={dataItem.value}
                        placeholder={dataItem.placeholder}
                        onChange={handleInputChange}
                        value={value}
                    />
                    </div>
                ) : (
                    <p className='text-second leading-p mx-auto text-center text-lg'>
                        {dataItem.description}
                    </p>
                )}
    </div>
  )
}

export default FormChoiceInputItem