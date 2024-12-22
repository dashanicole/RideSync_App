import { useNavigate } from 'react-router-dom';
import DriverImg from '../../../../assets/driverLanding.png'
import { Button } from '../../../atoms/Button';
import { Title } from '../../../atoms/Title';
import useInView from "../../../../utils/CustomHook/useInView";
import { useRef } from 'react';

const Components = ()=> {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef)


    const navigate = useNavigate();
    const handleNavigate = ()=> {
        navigate('driver/register')
    }

    return(
        <section ref={sectionRef} className='flex flex-col lg:h-lvh md:justify-center items-center lg:flex-row py-16 gap-10'>
            <div className={`lg:w-1/2 flex justify-center items-center ${isInView ? 'animate-slideInFromLeft' : 'opacity-0'}`}>
                <div className="bg-colorBlue rounded-full flex aspect-square lg:aspect-square justify-center">
                    <img src={DriverImg} alt="Picture of a driver of a car with his passenger" className='w-[500px]'/>
                </div>
            </div>
            <div className={`lg:w-1/2 flex justify-center align-center flex-col ${isInView ? 'animate-slideUp' : 'opacity-0'}`}>
                <div className='py-6'>
                    <Title variant="h2" value={"Become a driver today"}/>
                </div>
                <p className='text-xl font-semibold text-neutral-500 lg:w-full pb-6'>Take control of your schedule and earn on your terms with RideSync. Join our community of drivers, enjoy competitive pay, and get 24/7 support. Start your journey today!</p>
                <Button name="Become a Driver" variant="contained" size="large" onClick={handleNavigate}/>
            </div>
        </section>
    )
}
export default Components;