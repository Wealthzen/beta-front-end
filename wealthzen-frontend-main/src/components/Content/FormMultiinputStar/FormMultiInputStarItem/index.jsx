import React from 'react'

const FormMultiInputStarItem = ({ choice, handleFormInputs, value}) => {

    return (

        <figure
            className={`h-full px-8 py-6 border rounded-lg border-pink hover:shadow-focus min-w-264 w-full flex flex-col justify-start`}
            style={{margin: '10px 0'}}
        >
            <div className='flex justify-between items-center'>
                {/* <div className='text-2xl'>
                    {choice.value}. {choice.text} 
                </div> */}
                <p className='text-left' style={{opacity: "0.7"}}>
                    {choice.text}
                </p>
                <div>
                    <span className="star-rating">
                      <input type="radio" name={choice.value} value="1" onClick={handleFormInputs}/><i></i>
                      <input type="radio" name={choice.value} value="2" onClick={handleFormInputs}/><i></i>
                      <input type="radio" name={choice.value} value="3" onClick={handleFormInputs}/><i></i>
                      <input type="radio" name={choice.value} value="4" onClick={handleFormInputs}/><i></i>
                      <input type="radio" name={choice.value} value="5" onClick={handleFormInputs}/><i></i>
                    </span>
                </div>
            </div>
        </figure>
    )
}

export default FormMultiInputStarItem