import {Title} from "../../../../atoms/Title"

const Components = ()=> {
    return(
        <div className="pb-12">
            <div className="rounded-xl bg-zinc-700 w-40 h-40">{/*COMPANY LOGO*/}</div>
            <div>
                <Title variant="footerTitle" value="RideSync" />
                <div className="w-2/3">
                    Lorem ipsum dolor sit amet, consectetur, adipiscing elit. Nullam condiemntu luctus arcu sit amet dapibus.
                </div>
            </div>
        </div>
    )
}
export default Components