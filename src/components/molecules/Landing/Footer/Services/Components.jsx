import {Title} from "../../../../atoms/Title"

const Components = ()=> {
    const data = [
        {id: 1, name: 'Ride-Sharing',link: "/our-services/ride-sharing"},
        {id: 2, name: 'Carpool',link: "/our-services/car-pooling"}
    ]
    return(
    <div>
        <div className="pb-2">
            <Title variant="footerTitle" value="Services" />
        </div>
        <ul>
                {data.map((item) => (
                    <li
                        key={item.id}
                         className="group transition-all duration-300 transform hover:translate-x-2 hover:text-blue-500 w-fit"
                    >
                        <a href={item.link} className="text-lg group-hover:font-bold font-medium">
                            {item.name}
                        </a>
                    </li>
                ))}
        </ul>
    </div>
    )
}
export default Components