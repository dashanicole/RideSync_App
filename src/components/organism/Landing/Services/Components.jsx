import { Rideshare } from "../../../molecules/Landing/RideSharing";
import { Carpool } from "../../../molecules/Landing/Carpool";
import useInView from "../../../../utils/CustomHook/useInView";
import { useRef } from "react";

const Components = () => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef)
    return (
        <section ref={sectionRef}  className="w-full md:min-h-[800px] lg:h-lvh flex flex-col pt-5 pb-24 lg:pb-0">
            <h2 className={`py-7 text-5xl font-bold text-sky-50 ${isInView ? 'animate-slideUp' : 'opacity-0'}`} >Our Services</h2>
            <div className={`pt-10 md:pt-20 flex flex-col justify-start items-start  md:flex-row md:justify-center  gap-10 md:gap-20 lg:gap-44 grow  shrink ${isInView ? 'animate-slideUp' : 'opacity-0'}`}>
                <div className={`${isInView ? 'animate-slideUp' : 'opacity-0'}`} ><Rideshare /></div>
                <div className={`${isInView ? 'animate-slideUp' : 'opacity-0'}`}><Carpool /></div>
            </div>
        </section>
    );
};

export default Components;
