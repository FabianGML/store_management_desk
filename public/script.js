let title = document.getElementById('title');
let btn = document.getElementById('btn');

btn.addEventListener('click', async () => {
    const products = await window.Products.products();
    title.innerText = JSON.stringify(products)
})