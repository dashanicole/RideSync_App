import {motion, useInView} from "framer-motion"
import { useRef } from "react";

const Info = ({imgSrc, text}) => {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true,
    })

    return (
        <div className='flex flex-col-reverse md:flex-row justify-center items-center bg-colorBlue p-6 sm:p-8 sm:py-40 md:p-10  lg:p-16 md:h-dvh rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[300px] md:rounded-br-[300px]'>
            {/* Image Section */}
            <div className='w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0'>
                <motion.div 
                    ref={ref}
                    initial={{opacity: 0, y: 100}}
                    animate={{
                        y: isInView ? 0 : 100,
                        opacity: isInView ? 1 : 0,
                    }}
                    transition={{duration:0.5, ease: 'easeInOut'}}
                    className='w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] aspect-square bg-white rounded-full flex items-center justify-center overflow-hidden'>
                    <img 
                        src={imgSrc} 
                        alt="a picture" 
                        className='w-full h-full object-cover animate-slideUp' 
                    />
                </motion.div>
            </div>
            
            {/* Text Section */}
            <motion.div
                initial={{opacity: 0, x: 100}}
                animate={{opacity: 1, x: 0}}
                transition={{duration:0.3, ease:'easeInOut', delay: 0.4}}
                className='w-full xl:w-1/2 flex justify-start md:justify-start'>
                <p className='text-[1.2rem] sm:text-[1.5rem] md:text-[1.7rem] lg:text-[2rem] xl:text-[2.5rem] text-white w-auto xl:w-full py-10 sm:pl-10 xl:pl-0 leading-relaxed text-left font-semibold'>
                   {text} 
                </p>
            </motion.div>
        </div>
    );
};

export default Info;
