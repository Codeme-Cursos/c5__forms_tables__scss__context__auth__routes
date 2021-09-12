import React from 'react';
import SVGLoading from '../icons/SVGLoading';
import './style.scss';

const Loader = () => {
    return (
        <div className="loader">
            <SVGLoading size={150} color="rgb(83, 83, 253)" />
        </div>
    )
}

export default Loader
