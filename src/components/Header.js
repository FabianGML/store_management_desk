import React from "react";




function Header({ children }) {
    return(
        <header className="fixed block  bg-slate-900 w-full">
            <div className="flex ml-20">
                { children }
            </div>
        </header>
    )
}

export default Header;