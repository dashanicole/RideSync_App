import {motion} from "framer-motion"
const Hero = ({text, imgSrc}) => {
    return (
        <div className="flex flex-col lg:flex-row px-8">
            <div className="lg:w-1/2 flex items-center justify-center lg:justify-end">
                <motion.div 
                    initial={{opacity:0, y:20}}
                    animate={{opacity: 1, y:0}}
                    transition={{duration: 0.3, ease:"easeIn", delay:0.3}}
                    className="pl-0 lg:pl-28 w-full">
                    <h1 className=' text-[2rem] text-center sm:text-left sm:text-[4rem] font-bold'>
                        {text}
                    </h1>
                </motion.div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center animate-slideInFromRight">
                <img
                    src={imgSrc}
                    alt="Picture of two people riding a motorcycle"
                    className="w-full lg:w-[800px] h-auto"
                />
            </div>
        </div>
    );
};

export default Hero;
