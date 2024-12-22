import { useNavigate } from 'react-router-dom';
import rideshare from '../../../../assets/rideshare.png'
const Components = ()=> {
  const navigate = useNavigate()

  const handleRideShare = () =>{
    navigate('/our-services/ride-sharing')
  }

    return (
        <div className="w-80 flex flex-col items-start md:items-center gap-3 group cursor-pointer shrink" onClick={handleRideShare}>
          <div className="bg-stone-100 rounded-full">
            <img
              src={rideshare}
              className="rounded-full h-36 sm:h-80 transform transition-transform duration-300 group-hover:scale-125"
            />
          </div>
          <div className='flex flex-col items-start sm:items-center'>
            <h2 className="text-4xl font-bold text-white mb-3">Ride Sharing</h2>
            <h3 className="text-xl font-bold text-neutral-500 mb-6">Passenger Service</h3>
            <p className='text-xl mb-3'>Book a ride effortlessly and travel to your destination with ease</p>
            <span className="text-black font-bold text-xl">LEARN MORE</span> {/*To be changed*/}
          </div>
        </div>
    );
};
export default Components;