
import { motion, useInView } from 'motion/react'
import {Features} from '../../molecules/Landing/Features'
import { useRef } from 'react'

const KeyFeatures = ({features, text})=> {


    const sectionRef = useRef(null)
    const isSectionInView = useInView(sectionRef,{
        once: true,
        value: 'all'
    })

    const containerRef = useRef(null)
    const isContainerInView = useInView(containerRef,{
        once: true,
        value: 'all'
    })

    return(
        <div 
            ref={sectionRef} 
            className='flex flex-col px-5 md:px-16 pb-16'>
            <motion.h2 
                initial={{opacity: 0, y: 100}}
                animate={{
                    y: isSectionInView ? 0 : 100,
                    opacity: isSectionInView ? 1 : 0,
                }}
                transition={{duration: 0.5, ease: 'easeInOut',}}
                className={`text-5xl font-bold py-10`}>
                    {text}
            </motion.h2>
            <div className='flex flex-col lg:flex-row items-center lg:justify-around bg-colorBlue py-16 lg:py-10 rounded-2xl '>
                {features.map((item, index) => (
                    <motion.div 
                        ref={containerRef}
                        initial={{opacity: 0, y: 100}}
                        animate={{
                            y: isContainerInView ? 0 : 100,
                            opacity: isContainerInView ? 1 : 0,
                        }}
                        transition={{duration: 0.5, ease: 'easeInOut', delay: 0.2}}
                        key={index} 
                        className={`w-[300px] flex shrink`}
                    > 
                        <Features
                            imageSrc={item.imageSrc}
                            title={item.title}
                            description={item.description}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
export default KeyFeatures;