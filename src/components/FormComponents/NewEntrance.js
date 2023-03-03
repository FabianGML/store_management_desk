import React from "react";

function NewEntrance({ text }) {
    return (
        <div className="h-12 w-3/4 bg-green-600">
            <p className="h-full text-white justify-center items-center flex">{text}</p>
        </div>
    )
}

export default NewEntrance