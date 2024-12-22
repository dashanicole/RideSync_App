import { Title } from '../../../../atoms/Title';
import PlaceIcon from '@mui/icons-material/Place';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const Components = () => {
    return (
        <div>
            <div className='pb-2'>
                <Title variant="footerTitle" value="Contact" />
            </div>
            <ul className="space-y-4 mt-4">
                <li>
                    <a
                        href="#"
                        className="flex items-center space-x-3 text-neutral-700 hover:text-blue-600 transition-colors duration-300"
                    >
                        <PlaceIcon className="text-blue-500" />
                        <span className="text-lg font-medium">Cebu City, Philippines</span>
                    </a>
                </li>
                <li>
                    <a
                        href="mailto:ridesync@gmail.com"
                        className="flex items-center space-x-3 text-neutral-700 hover:text-blue-600 transition-colors duration-300"
                    >
                        <EmailIcon className="text-blue-500" />
                        <span className="text-lg font-medium">ridesync@gmail.com</span>
                    </a>
                </li>
                <li>
                    <a
                        href="tel:+631234567890"
                        className="flex items-center space-x-3 text-neutral-700 hover:text-blue-600 transition-colors duration-300"
                    >
                        <PhoneIcon className="text-blue-500" />
                        <span className="text-lg font-medium">+63 123 456 7890</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Components;
