import { useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion, useInView } from 'motion/react';


const Faq = ({questions}) => {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef)

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    return (
        <div ref={sectionRef} className='flex flex-col w-full justify-center px-5 md:px-16 py-16 bg-gray-200 rounded-tr-[150px] rounded-bl-[150px] md:rounded-tr-[300px] md:rounded-bl-[200px]'>
            <h2 className={`text-5xl font-semibold ${isInView ? 'animate-slideUp delay-500 transition-all' : 'opacity-0'}`}>Frequently Asked Questions</h2>
            <p className={`text-2xl pt-6 ${isInView ? 'animate-slideUp delay-1000' : 'opacity-0'}`}>Your Questions, Answered</p>
            <div className="flex flex-col w-full py-10 justify-center items-center gap-6">
                {questions.map((item, index) => {
                    const itemRef = useRef(null)
                    const isItemInView = useInView(itemRef, {
                        value: 'all',
                        once: true,
                    })
                    return(
                    <motion.div 
                        ref={itemRef} 
                        initial={{opacity: 0}}
                        animate={{opacity: isItemInView ? 1 : 0}}
                        transition={{duration: 0.5, ease: 'easeIn', delay:0.2}}
                        key={index} 
                        className={`bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-3/5`}>
                        <h3
                            onClick={() => toggleFAQ(index)}
                            className="bg-[#00A6CE] text-white font-bold py-3 px-4 cursor-pointer hover:bg-[#0298bd] flex justify-between items-center"
                        >
                            {item.question}
                            <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                <ExpandMoreIcon />
                            </span>
                        </h3>
                        <div className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                            <p className="bg-white text-gray-700 py-3 px-4">
                                {item.answer}
                            </p>
                        </div>
                    </motion.div>
                    )
                })}
            </div>
            
        </div>
    );
};

export default Faq;
