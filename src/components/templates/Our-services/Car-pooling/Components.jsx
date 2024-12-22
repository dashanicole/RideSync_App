import { useEffect } from "react";
import { HomeHeader } from "../../../molecules/HomeHeader";
import Hero from "../../../organism/Our-Services/Hero";
import Info from "../../../organism/Our-Services/Info";
import KeyFeatures from "../../../organism/Our-Services/KeyFeatures";
import Faq from "../../../organism/Our-Services/Faq";
import { Footer } from "../../../organism/Landing/Footer";

import heroImg from "../../../../assets/carpooling_hero.png"
import infoImg from "../../../../assets/driver3.jpg"
import benefitImg1 from "../../../../assets/lowcost.png"
import benefitImg2 from "../../../../assets/environment.png"
import benefitImg3 from "../../../../assets/carpool_community.png"
import benefitImg4 from "../../../../assets/convenience.png"

const Components = ()=> {
    useEffect(()=>{
        window.scrollTo(0,0);
    }, [])

    const features = [
        {imageSrc: benefitImg1,title: 'Cost Savings',description: 'Share the cost of your commute and save up to 50%.'},
        {imageSrc: benefitImg2,title: 'Environmental Impact',description: 'Reduce emissions by sharing rides.'},
        {imageSrc: benefitImg3,title: 'Community Building',description: 'Connect with fellow commuters and make your journeys enjoyable.'},
        {imageSrc: benefitImg4,title: 'Convenience',description: 'Flexible options to match your schedule.'},
    ]

    const questions = [
        {question: 'How do I find a carpool match?', answer: 'Simply enter your route and preferred times on the app, and we’ll connect you with drivers or riders going the same way.'},
        {question: 'How much does carpooling cost?', answer: 'Costs are split among passengers and calculated based on distance. You’ll see the estimated price before booking.'},
        {question: 'Can I choose who I ride with?', answer: 'Yes, you can view user profiles, ratings, and reviews to select a driver or passenger that best fits your preferences.'},
        {question: 'Is carpooling safe?', answer: 'Absolutely! All users are verified, and you can check driver and passenger ratings. Plus, you can share your trip details with friends or family.'},
        {question: 'What if I need to cancel my ride?', answer: 'You can cancel through the app. We recommend canceling early to avoid inconvenience; cancellation fees may apply if done last minute.'},
        {question: 'How do you verify drivers?', answer: 'All drivers undergo a background check, and their vehicles must meet our safety standards.'},
        {question: 'Can I schedule a carpool in advance?', answer: 'Yes, you can schedule a ride up to 7 days ahead through our app.'},
        {question: 'What happens if I’m late for a pickup?', answer: 'Drivers typically wait for a few minutes. Communication through the app is key to coordinating effectively.'},
        {question: 'Can I bring luggage or packages?', answer: 'Small luggage is usually allowed, but check with your driver for larger items.'},
        {question: 'Are there any hidden fees?', answer: 'No hidden fees! The price you see is the price you pay, split transparently among passengers.'}
    ]

    return(
        <div>
            <div className="sticky top-0"><HomeHeader/></div>
            <Hero 
                text={'Carpooling Made Easy and Sustainable'}
                imgSrc={heroImg}
            />
            <Info 
                text={`Share rides effortlessly with RideSync. Whether you need a daily commute solution or a
                     one-time trip, our platform connects you with trusted drivers and fellow passengers. Save 
                     on travel costs, reduce emissions, and enjoy a comfortable journey—whenever and wherever 
                     you need to go.`}
                imgSrc={infoImg}
            />
            <KeyFeatures 
                features={features}
                text={'Why RideSync Carpooling?'}
            />
            <Faq 
                questions={questions}
            />
            <Footer />
        </div>
    )
}

export default Components;