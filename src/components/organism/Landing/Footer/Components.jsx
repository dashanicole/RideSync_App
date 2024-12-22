import { Browse } from "../../../molecules/Landing/Footer/Browse";
import { GenInfo } from "../../../molecules/Landing/Footer/GenInfo";
import { Contact } from "../../../molecules/Landing/Footer/Contact";
import { Copyright } from "../../../molecules/Landing/Footer/Copyright";
import { ServicesFooter } from "../../../molecules/Landing/Footer/Services";

const Components = () => {
    return (
        <footer className="px-4 py-8 md:px-16 lg:px-32 md:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <GenInfo />
                <Browse />
                <ServicesFooter />
                <Contact />
            </div>
            <div className="mt-8 text-center md:text-left">
                <Copyright />
            </div>
        </footer>
    );
};

export default Components;
