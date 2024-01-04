export default function formInputs (currentSection) {
  const inputs = {
    Productos: [
      ['*Nombre', 'name', 'text', 'Fiserul...', true],
      ['*Precio', 'price', 'number', '$120', true],
      ['*Stock', 'stock', 'number', '5', true],
      ['Codigo de Barras', 'barCode', 'text', '087952345', false],
      ['Ingredientes', 'ingredients', 'text', 'Manzanilla, Equinacea...', false],
      ['*Caducidad', 'expiration', 'date', '', true]
    ]
  }
  return inputs[currentSection]
}
