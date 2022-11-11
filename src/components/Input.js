function Input({ searchValue, onSearchValueChange, width, margin }) {
    return (
        <input 
            placeholder="Buscar producto..." 
            className={` ${width} ${margin} h-14  pl-4 text-lg border border-gray-500 rounded-md outline-none`}
            value = { searchValue }
            onChange = { onSearchValueChange }
        ></input>
    )
}

export default Input