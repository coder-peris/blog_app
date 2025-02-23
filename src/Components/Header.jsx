import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import useWindowSize from '../hooks/useWindowSize';

const Header = ({ title }) => {
    const { width } = useWindowSize();
    return (
        <header className='header'>
            <h1>{title}
                {width < 576 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
            </h1>
        </header>
    )
}

export default Header;