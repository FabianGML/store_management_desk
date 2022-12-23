import React from "react"
import Content from "./Content"
import Title from "./Title"
import Input from "./Input"

function MainContent() {
    

    return(
        <section className='h-screen pt-32 px-5 flex'>
            <div className="w-3/4 mr-7">
                <Title />
                <Content />
            </div>
            <div className="mt-20">
                <img src="" className="border border-black w-full h-80" ></img>
                <Input 
                    width= 'w-full'
                    margin= 'mt-10'
                />
                
            </div>
        </section>
    )
}

export default MainContent