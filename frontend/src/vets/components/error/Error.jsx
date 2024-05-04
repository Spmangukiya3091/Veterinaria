import React from 'react';
import './error.scss'; // Import SCSS file
import { Link } from 'react-router-dom';

const Error = ({ message }) => {
    return (
        <section className="main-error-page">
            <h1 className="error-title">500 Error del Servidor</h1>
            <div className="container">
                <div className='fs-4 m-5'><span className="hidden" id="js-hidden">{message}</span></div>
                <Link to={"/veterine/resumen"}> Regresa</Link>
            </div>
        </section>
    );
};

export default Error;
