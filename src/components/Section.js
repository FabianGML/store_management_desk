function Section({svg, text }) {
    return(
        <div className="m-7 flex cursor-pointer hover:bg-slate-700 p-4 rounded-lg">
            <img src={ svg } className="w-11 pr-5"></img>
            <span className="text-white">{ text }</span>
        </div>
    )
}

export default Section