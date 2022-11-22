import React, {FC} from 'react'
import './Preloader.css'

interface IPreloaderProps {
    load?: boolean;
    style?: React.CSSProperties;
}
const Preloader: FC<IPreloaderProps> = ({load, style}) => {
    return (
        <div style={style} className={`preloader ${load ? 'preloader_visible': ''}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
