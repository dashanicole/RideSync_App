import { useNavigate } from 'react-router-dom';
import joinUs from '../../../assets/join_us.png'
const Cta = () => {
    const navigate = useNavigate();

    const handleSignUp = ()=> {
        navigate('/passenger/register')
    }

    return (
      <div className="bg-[#00A6CE] flex flex-col lg:flex-row-reverse items-center justify-between p-3 md:p-8 lg:p-16 rounded-tr-[70px] rounded-bl-[70px] shadow-lg">
        {/* Text Section */}
        <div className="md:ml-16 md:text-center lg:text-left mb-6 lg:mb-0 lg:w-3/5">
          <h2 className="text-white text-4xl font-bold mb-4 leading-snug">
            Join Us on Our Journey
          </h2>
          <p className="text-white text-lg mb-6 leading-relaxed">
            Make transportation smarter, greener, and more connected. Become part of the future today!
          </p>
          <button className="bg-white text-[#00A6CE] hover:bg-gray-200 font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
  
        {/* Image Section */}
        <div className="lg:w-2/5 flex justify-center">
          <img
            src={joinUs}  // Replace with your image path
            alt="Join RideSync"
            className=""
          />
        </div>
      </div>
    );
  };
  
  export default Cta;
  