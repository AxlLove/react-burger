import React from 'react'
import './Preloader.css'

const Preloader = ({load}) => {
    return (
        <div className={`preloader ${load ? 'preloader_visible': ''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
