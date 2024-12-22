import { div } from "motion/react-client";
import Hero from "../../organism/Our-Services/Hero";
import img from "../../../assets/abotus.jpg"
import { HomeHeader } from "../../molecules/HomeHeader";
import { Footer } from "../../organism/Landing/Footer";
import Cta from "../../organism/AboutUs/Cta";
import KeyFeatures from "../../organism/Our-Services/KeyFeatures";
import safety from '../../../assets/safety.png'
import sustainability from '../../../assets/sustainability.png'
import community from '../../../assets/community.png'
import transparency from '../../../assets/transparency.png'
import meeting from '../../../assets/meeting.jpg'
import { useEffect, useRef } from "react";
import { useInView, motion } from "motion/react";

const Components = ()=> {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef,{
        once: true,
        value: 'all'
    })

    const heading = useRef(null)
    const isHeadingInView = useInView(heading,{
        value:'all',
        once:true,
    })

    const image = useRef(null)
    const isImageInView = useInView(image,{
        value:'all',
        once: true,
    })

    const missionVision = [
        {headline: 'Our Mission', description: 'We aim to reduce traffic congestion, cut carbon emissions, and help communities save money by connecting riders and drivers safely and efficiently.'},
        {headline: 'Our Vision', description: 'To create a connected, sustainable world where every ride builds a stronger community, reduces environmental impact, and transforms daily commutes into meaningful connections.'},
    ]

    const coreValues = [
        {imageSrc: safety,title: 'Safety First' ,description: 'We prioritize passenger and driver safety with rigorous checks and continuous support'},
        {imageSrc: sustainability,title: 'Sustainability',description: 'Every shared ride helps reduce our environmental impact'},
        {imageSrc: community,title: 'Community',description: 'We believe in building connections and fostering a sense of shared responsibility'},
        {imageSrc: transparency,title: 'Transparency',description: 'Clear communication and fair pricing are at the heart of our service'},
    ]

    return (
        <div>
            <div className="sticky top-0">
            <HomeHeader />
            </div>
            <Hero text={'Our Journey Begins with You'} imgSrc={img} />
            <motion.div ref={sectionRef} className="flex flex-col lg:flex-row justify-center bg-colorBlue text-white p-8 lg:p-32 rounded-tl-[150px] rounded-br-[150px]"
                initial={{opacity: 0, y: 100}}
                animate={{
                    y: isInView ? 0 : 100,
                    opacity: isInView ? 1 : 0,
                }}
                transition={{duration: 0.5, ease: 'easeInOut',}}
            >
                <div className="lg:w-1/2 flex flex-col pr-0 lg:pr-10 mb-8 lg:mb-0">
                    <motion.h2 ref={heading} className="text-2xl md:text-4xl font-bold pb-7 md:text-center lg:text-left"
                        initial={{opacity: 0, x:-100}}
                        animate={{
                            x:isHeadingInView ? 0 : -100,
                            opacity: isHeadingInView ? 1 : 0
                        }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeInOut',
                            delay: 0.3
                        }}
                    >
                        At RideSync, we’re transforming the way you commute. We aim to make carpooling accessible, affordable, and better for the planet.
                    </motion.h2>
                    <motion.div className="bg-white text-black rounded-2xl p-6 flex flex-col"
                        initial={{opacity: 0, x:-100}}
                        animate={{
                            x:isHeadingInView ? 0 : -100,
                            opacity: isHeadingInView ? 1 : 0
                        }}
                        transition={{
                            duration: 0.5,
                            ease: 'easeInOut'
                        }}
                    >
                        {missionVision.map((item) =>{
                            const vm = useRef(null)
                            const isVmInView = useInView(vm, {
                                value:'all',
                                once:true
                            })
                            return(
                                <motion.div ref={vm} className="pb-10"
                                    initial={{opacity: 0, x:-100}}
                                    animate={{
                                        x:isVmInView ? 0 : -100,
                                        opacity: isVmInView ? 1 : 0
                                    }}
                                    transition={{
                                        duration: 0.7,
                                        ease: 'easeInOut',
                                        delay: 0.2
                                    }}
                                >
                                    <h2 className="text-2xl md:text-4xl pb-4 text-center lg:text-left font-bold">{item.headline}</h2>
                                    <p className="text-lg md:text-2xl leading-relaxed text-center lg:text-left">
                                        {item.description}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
                <div ref={image} className="lg:w-1/2 flex justify-center">
                <motion.img
                    src={meeting}
                    alt="a meeting"
                    className="w-full max-w-sm lg:max-w-full rounded-2xl shadow-lg"
                    initial={{opacity:0, y:300}}
                    animate={{
                        y: isImageInView ? 0 : 300,
                        opacity: isImageInView ? 1 : 0
                    }}
                    transition={{duration: 0.7, ease:'easeOut'}}
                />
                </div>
            </motion.div>
          <KeyFeatures features={coreValues} text={'Our Values'} />
          <Cta />
          <Footer />
        </div>
      );
}
export default Components;