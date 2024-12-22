import { useNavigate } from 'react-router-dom';
import carpool from '../../../../assets/carpool.png'
const Components = () => {
    const navigate = useNavigate()
    const handleCarpool = ()=> {
        navigate('/our-services/car-pooling')
    }
    return(
        <div onClick={handleCarpool} className='w-80 flex flex-col items-start md:items-center gap-3 group cursor-pointer'>
            <div className='bg-stone-100 rounded-full'>
                <img src={carpool} className='rounded-full h-36 w-36 sm:h-80 sm:w-80 transform transition-transform duration-300 group-hover:scale-125'/>
            </div>
            <div className='flex flex-col justify-start md:justify-center md:items-center '>
                <h2 className='text-4xl font-bold text-white mb-3'>Car-pooling</h2>
                <h3 className='text-xl font-bold text-neutral-500 mb-6'>Passenger Service</h3>
                <p className='text-xl mb-3'>Share a ride and save costs while traveling together to your destination</p>
                <span className='text-black text-xl font-bold'>LEARN MORE</span> {/*To be changed*/}
            </div>
        </div>
    )
}

export default Components;