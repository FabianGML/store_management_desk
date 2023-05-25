import React from "react";

function NewEntrance({ text, error }) {
    const classNames = error ? 'h-12 w-3/4 bg-red-600': 'h-12 w-3/4 bg-green-600'
    return (
        <div className={classNames}>
            <p className="h-full text-white justify-center items-center flex">{text}</p>
        </div>
    )
}

export default NewEntrance