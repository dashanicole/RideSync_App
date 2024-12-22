const Components = ({imageSrc, title, description})=> {
    return(
        <div className="flex flex-col align-center justify-center shrink sm:p-10 md:p-0 lg:px-2">
            <div className="bg-neutral-50 rounded-full flex justify-center p-5 aspect-square w-[200px] md:w-[300px] lg:w-[200px] xl:w-[250px] self-center">
                <img src={imageSrc} alt="" className=""/>
            </div>
            <h3 className="text-2xl font-bold pt-10 text-white text-center sm:text-left">{title}</h3>
            <p className="text-white text-xl text-center sm:text-left pb-10 sm:pb-0">{description}</p>
        </div>
    )
}
export default Components;