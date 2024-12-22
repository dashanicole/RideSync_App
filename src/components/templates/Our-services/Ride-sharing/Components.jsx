import { useEffect } from "react"
import { HomeHeader } from "../../../molecules/HomeHeader"
import { Footer } from "../../../organism/Landing/Footer"
import Faq from "../../../organism/Our-Services/Faq"
import Hero from "../../../organism/Our-Services/Hero"
import Info from "../../../organism/Our-Services/Info"
import KeyFeatures from "../../../organism/Our-Services/KeyFeatures"

import heroImg from "../../../../assets/ridesharing_hero.png"
import infoImg from '../../../../assets/info.png';
import time from '../../../../assets/247.png'
import safety from '../../../../assets/safety.png'
import price from '../../../../assets/price.png'

const Components = ()=> {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])

    const features = [
        {imageSrc: time ,title: 'Convenience', description: 'Book quickly, track in real-time, and ride flexibly—travel made easy'},
        {imageSrc: safety ,title: 'Safety', description: 'Thorough driver checks, inspected vehicles, and in-app safety features for your peace of mind.'},
        {imageSrc: price ,title: 'Affordability', description: 'Transparent pricing, budget-friendly options, and no hidden fees.'},
    ]

    const questions = [
        { question: 'How do I book a ride?', answer: 'You can book a ride using our app or website. Simply enter your pickup and drop-off locations, choose your preferred ride type, and confirm. A driver will be matched with you shortly.' },
        { question: 'What payment methods do you accept?', answer: 'We accept credit/debit cards, digital wallets, and in some locations, cash. You can manage your payment options in the app settings.' },
        { question: 'Can I schedule a ride in advance?', answer: 'Absolutely! You can schedule a ride up to 7 days in advance through the app. Just select the "Schedule Ride" option when booking.' },
        { question: 'Is ridesharing safe?', answer: 'Yes, safety is our top priority. All drivers undergo background checks, and vehicles are regularly inspected. Additionally, you can share your ride details with friends or family and access emergency assistance through the app.' },
        { question: 'How are fares calculated?', answer: 'Fares are based on the distance traveled, time taken, and current demand (such as surge pricing during peak hours). You’ll see an estimated fare before booking your ride.' },
        { question: 'Can I cancel a ride?', answer: 'Yes, you can cancel a ride before the driver arrives. A cancellation fee may apply if the driver has already started their journey to your location.' },
    ];
    

    return(
        <div>
            <div className="sticky top-0">
                <HomeHeader />
            </div>
            <Hero text={'Simplifying Ridesharing, Anytime, Anywhere'} imgSrc={heroImg}/>
            <Info 
                text={`Ridesync offers a fast, affordable ridesharing experience. Just enter your pick-up and drop-off locations, 
                    and our app connects you to nearby drivers for a safe and convenient journey. Say goodbye to long waits 
                    and high fares with reliable rides at competitive rates.`}
                imgSrc={infoImg}
            />
            <KeyFeatures 
                features={features}
                text={'Why RideSync Ride Sharing?'}
            />
            <Faq 
                questions={questions}
            />
            <Footer />
        </div>
    )
}
export default Components