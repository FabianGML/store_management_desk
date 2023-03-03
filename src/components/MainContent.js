import React from "react"
import Content from "./Content"
import Title from "./Title"
import Input from "./Input"
import Modal from "../Modal/Modal"
import Form2 from "./FormComponents/Form2"

function MainContent() {
    const [modal, setModal] = React.useState(false)

    return(
        <section className='h-screen pt-32 px-5 flex'>
            <div className="w-3/4 mr-7">
                <Title />
                <Content setModal={setModal}/>
            </div>
            <div className="mt-20">
                <img src="" className="border border-black w-full h-80" ></img>
                <Input 
                    width= 'w-full'
                    margin= 'mt-10'
                />
                
            </div>
            { modal && (
                <Modal 
                    // form1={ () => <Form1 />} //Form 1 Is going to be need when less than 4 input fields are required
                    form2={ (submitInfo, formState, setFormState/*loading, setLoading*/) => <Form2 submitInfo={submitInfo} formState={formState} setFormState={setFormState} />}
                    setModal={setModal}
                />
            )}
        </section>
    )
}

export default MainContent