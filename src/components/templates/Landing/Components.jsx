import { useEffect, useRef } from "react"
import { HomeHeader } from "../../molecules/HomeHeader"
import { BeDriver } from "../../organism/Landing/Driver"
import {Footer} from "../../organism/Landing/Footer"
import { General } from "../../organism/Landing/General"
import { Services } from "../../organism/Landing/Services"

const Components = () => {
    const servicesRef = useRef(null);

    // Scroll to the "Our Services" section
    const scrollToServices = () => {
      if (servicesRef.current) {
        servicesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    // Check hash in the URL on component mount and scroll
    useEffect(() => {
      if (window.location.hash === "#services") {
        scrollToServices();
      }
      else{
        window.scrollTo(0,0)
      }
    }, []);
    return(
        <div>
            <div className="sticky top-0 z-50">
                <HomeHeader />
            </div>
            <div>
                <div className="px-6 md:px-32"> 
                    <General />
                </div>
                <div ref={servicesRef} className="px-6 py-6 md:px-32  bg-colorBlue flex">
                    <Services />
                </div>
                <div className="px-6 md:px-32">
                    <BeDriver />
                </div>
            </div>
            <Footer />
            
        </div>
    )
}

export default Components