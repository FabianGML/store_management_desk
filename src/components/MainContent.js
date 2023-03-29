import React from "react"
import Content from "./Content"
import Title from "./Title"
import Input from "./Input"
import Modal from "../Modal/Modal"
import ProductForm from "./FormComponents/ProductForm"
import OrderForm from "./FormComponents/OrderForm"
import ProviderForm from "./FormComponents/ProviderForm"
import LabForm from "./FormComponents/LabForm"

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
                    productForm={ (submitInfo, formState, setFormState) => <ProductForm submitInfo={submitInfo} formState={formState} setFormState={setFormState} />}
                    orderForm={ (submitInfo, formState, setFormState) => <OrderForm submitInfo={submitInfo} formState={formState} setFormState={setFormState} />}
                    providerForm={ (submitInfo, formState, setFormState) => <ProviderForm submitInfo={submitInfo} formState={formState} setFormState={setFormState} />}
                    labForm={ (submitInfo, formState, setFormState) => <LabForm submitInfo={submitInfo} formState={formState} setFormState={setFormState} />}
                    setModal={setModal}
                />
            )}
        </section>
    )
}

export default MainContent