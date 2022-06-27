import React from 'react'

const FormMultiInputPercentageOption = ({ choice, handleFormInputs, value}) => {

    return (

        <figure
            className={`h-full px-8 py-6 border rounded-lg border-pink hover:shadow-focus min-w-264 w-full flex flex-col justify-start`}
            style={{margin: '10px 0'}}
        >
            <div className='flex justify-between items-center'>
                <div className='text-2xl'>
                    {choice.value}. {choice.text} 
                </div>
                <div>
                    <input type={'number'} name={choice.value} value={value} placeholder={choice.placeholder} onChange={handleFormInputs} className='text-lg leading-8 py-2.5 px-3.5 max-w-xs w-full placeholder:text-gray rounded-lg border-1/2 border-pink bg-neutral-100 outline-0 focus-visible:none'/>
                </div>
            </div>
            <p className='text-left' style={{opacity: "0.7"}}>
                {choice.description}
            </p>
        </figure>
    )
}

export default FormMultiInputPercentageOption