import React from 'react'
import { Button } from '../../atoms/Button'
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Components = ({ isDriver = false }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/driver/register');
  };

  const handleToHomePage = ()=>{
    navigate('/')
  }

  const handleToServices = () => {
    navigate("/#services"); // Navigate to home with #services
  };

  const handleToAboutUs = ()=> {
    navigate('/about-us')
  }

  return (
    <div className="flex flex-col md:flex-row justify-around items-center bg-homeHeaderBg h-auto md:h-[70px] w-full p-4 md:p-6">
      <div className="flex items-center text-textColorHeader cursor-pointer">
        <h1 className="text-xl md:text-2xl font-bold"
        onClick={handleToHomePage}
        >
          RideSync</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center text-textColor space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
        <div >
          <span className="text-sm p-1 md:p-10 cursor-pointer text-textColorHeader" 
        onClick={handleToHomePage}
          >Home</span>
          <span className="text-sm p-1 md:p-10 cursor-pointer text-textColorHeader"
        onClick={handleToServices}
          >Our Services</span>
          <span className="text-sm p-1 md:p-10 cursor-pointer text-textColorHeader"
        onClick={handleToAboutUs}
          >About Us</span>
        </div>
        {
          !isDriver && (
            <div className="mt-4 md:mt-0">
              <Button name="Become a Driver" variant="contained" size="small"
                onClick={handleNavigation}
              />
            </div>
          )
        }

      </div>
    </div>
  )
}

export default Components
