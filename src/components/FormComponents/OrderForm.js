import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../app/AppContext";
import FormButton from "../Buttons/FormButton";
import LoadingSpinner from "../LoadingSpinner";
import FormInput from "./FormInput";
import FormLabel from "./FormLabel";
import FormSelect from "./FormSelect";
import NewEntrance from "./NewEntrance";

function OrderForm({ submitInfo, formState, setFormState }) {
  const { form, setForm } = useContext(AppContext);
  const [order, setOrder] = useState({
    providerId: "",
    isPayed: false,
    orderArrive: "",
    items: [{ name: "", unitPrice: "", amount: "", expiration: "" }],
  });

  function handleInputChange(event, index) {
    const { name, value } = event.target;
    const items = [...order.items];
    items[index][name] = value;
    setOrder({ ...order, items });
  }

  function handleAddItem() {
    const newItem = { name: "", unitPrice: "", amount: "", expiration: "" };
    setOrder({ ...order, items: [...order.items, newItem] });
  }

  function combineForm() {
    setForm(order);
  }

  useEffect(() => {
        submitInfo()
  }, [form])


  return (
    <form
      onSubmit={combineForm}
      className="p-5 w-full h-full overflow-scroll flex flex-col items-center"
    >
      {!formState.loading && formState.response.message && (
        <NewEntrance text={formState.response.message} />
      )}

      <div className="flex flex-wrap ">
        <div>
          <FormLabel text="Proveedor" />
          <FormSelect
            handleChange={(event) =>
              setOrder({ ...order, providerId: event.value })
            }
          />
        </div>
        <div className="mx-10 p-5 flex flex-col border border-stone-600 rounded-lg">
          <FormLabel text="¿Esta Pagado?" />
          <input
            id="isPayed"
            type="checkbox"
            checked={order.isPayed}
            className="mt-6"
            onChange={(event) =>
              setOrder({ ...order, isPayed: event.target.checked })
            }
          />
        </div>
        <div>
          <FormLabel text="Fecha de Llegada" />
          <input
            id="orderArrive"
            type="date"
            value={order.orderArrive}
            className="h-12 border border-black m-5 pl-3"
            onChange={(event) =>
              setOrder({ ...order, orderArrive: event.target.value })
            }
          />
        </div>

        <h3 className="basis-full">Artículos:</h3>

        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap border border-gray-400 rounded-lg mb-6"
          >
            <div>
              <FormLabel text="Nombre" />
              <input
                id={`name-${index}`}
                name="name"
                type="text"
                value={item.name}
                className="h-12 border border-black m-5 pl-3"
                onChange={(event) => handleInputChange(event, index)}
              />
            </div>
            <div>
              <FormLabel text="Precio Unitario" />
              <input
                id={`unitPrice-${index}`}
                name="unitPrice"
                type="number"
                min="0"
                step="0.01"
                value={item.unitPrice}
                className="h-12 border border-black m-5 pl-3"
                onChange={(event) => handleInputChange(event, index)}
              />
            </div>
            <div>
              <FormLabel text="Cantidad " />
              <input
                id={`amount-${index}`}
                name="amount"
                type="number"
                min="0"
                step="1"
                value={item.amount}
                className="h-12 border border-black m-5 pl-3"
                onChange={(event) => handleInputChange(event, index)}
              />
            </div>
            <div>
              <FormLabel text="Fecha de Caducidad" />
              <input
                id={`expiration-${index}`}
                name="expiration"
                type="date"
                value={item.expiration}
                className="h-12 border border-black m-5 pl-3"
                onChange={(event) => handleInputChange(event, index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="w-12 rounded-full mb-6 bg-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-400 hover:text-gray-700 cursor-pointer"
        onClick={handleAddItem}
      >
        <span className="text-2xl font-bold leading-none">+</span>
      </div>
      {!formState.loading && (
        <FormButton
          text={"Enviar"}
          formState={formState}
          setFormState={setFormState}
          handleSubmit={combineForm}
        />
      )}
      {formState.loading && <LoadingSpinner />}
    </form>
  )
}

export default OrderForm;
