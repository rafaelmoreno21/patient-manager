import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Form = ({ createQuote }) => {
    //Create State Quotes
    const [quote, updateQuote] = useState({
        pet: '',
        owner: '',
        date: '',
        time: '',
        symptoms: ''
    });

    const [error, updateError] = useState(false)

    const updateState = e => {
        updateQuote({
            ...quote,
            [e.target.name]: e.target.value
        })
    };

    //Extract vars
    const { pet, owner, date, time, symptoms } = quote;
    //
    const submitQuote = e => {
        e.preventDefault();
        //Validar
        if (pet.trim() === '' || owner.trim() === '' || date.trim() === '' || time.trim() === '' || symptoms.trim() === '') {
            updateError(true);
            return;
        }

        //Delete message
        quote.id = uuidv4();
        updateError(false);


        //Asignar un ID
        console.log(quote);
        //Crear la cita
        createQuote(quote);

        //Reiniciar el form
        updateQuote({
            pet: '',
            owner: '',
            date: '',
            time: '',
            symptoms: ''
        })

    };
    return (
        <Fragment>
            <h2>Create quote</h2>
            {error ? <p className="alerta-error">All fields are required</p> : null}
            <form
                onSubmit={submitQuote}
            >
                <label>Pet's name</label>
                <input
                    type="text"
                    name="pet"
                    className="u-full-width"
                    placeholder="Pet's name"
                    onChange={updateState}
                    value={pet}
                />
                <label>Owner's name</label>
                <input
                    type="text"
                    name="owner"
                    className="u-full-width"
                    placeholder="Owner's name"
                    onChange={updateState}
                    value={owner}
                />
                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    className="u-full-width"
                    onChange={updateState}
                    value={date}
                />
                <label>Time</label>
                <input
                    type="time"
                    name="time"
                    className="u-full-width"
                    onChange={updateState}
                    value={time}
                />
                <label>Symptoms</label>
                <textarea
                    className="u-full-width"
                    name="symptoms"
                    onChange={updateState}
                    value={symptoms}
                >

                </textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Add quote</button>

            </form>
        </Fragment>
    )
}

Form.propTypes = {
    createQuote: PropTypes.func.isRequired
}

export default Form;