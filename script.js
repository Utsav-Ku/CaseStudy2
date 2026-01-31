let products = [];
async function fetchProduct(){
    const loader = document.getElementById("loader")
    const divObj = document.getElementById("product-container")
    try{
        loader.style.display="block"
        divObj.style.display="none"
        let url = "https://dummyjson.com/products"
        let response = await fetch(url)
        const data = await response.json();
        products = data.products;
        createCards();

        //console.log(products);

        loader.style.display="none"
        divObj.style.display="grid"
    } 
    catch(err){
        console.log(err);
    }
}

function createCards(){
    const divObj = document.getElementById("product-container");
    for(let product of products){
        let title = product.title
        let description = product.description
        let price = product.price
        let category = product.category
        let rating = product.rating
        let imageurl = product.images[0]

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <img src="${imageurl}" alt="${title}">
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Cateogry: ${category}</p>
        <p>Price: ${price}</p>
        <p>Rating: ${rating}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        divObj.appendChild(card);

        //console.log(title, description, price, category, rating, imageurl);
    }
}
fetchProduct();

function addToCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart")
}

function getFromCart(){
    let products = JSON.parse(localStorage.getItem("cart")) || [];
    const divObj = document.getElementById("cart-container");

    for(let product of products){
        let title = product.title
        let description = product.description
        let price = product.price
        let category = product.category
        let rating = product.rating
        let imageurl = product.images[0]

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <img src="${imageurl}" alt="${title}">
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Cateogry: ${category}</p>
        <p>Price: ${price}</p>
        <p>Rating: ${rating}</p>
        <button class="btn">Place Order</button>
        `;

        divObj.appendChild(card);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getFromCart();
})

function searchProduct(){
    let input = document.getElementById("search-input").value.toLowerCase();
    let matchedData = products.filter((product) => product.title.toLowerCase().includes(input));
    displaySearchProducts(matchedData);
}

function displaySearchProducts(products){
    const divObj = document.getElementById("product-container");
    divObj.innerHTML = ""
    if(products.length === 0){
        divObj.innerHTML = "<h3>No Product Found</h3>"
    }

    for(let product of products){
        let title = product.title
        let description = product.description
        let price = product.price
        let category = product.category
        let rating = product.rating
        let imageurl = product.images[0]

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <img src="${imageurl}" alt="${title}">
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Cateogry: ${category}</p>
        <p>Price: ${price}</p>
        <p>Rating: ${rating}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        divObj.appendChild(card);

        //console.log(title, description, price, category, rating, imageurl);
    }
}

function debounce(fn, delay){
    let timer;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn()
        }, delay);
    }
}

const handleSearch = debounce(searchProduct, 1000);

function throttle(fn, limit) {
    let flag = true;
    return function () {
        if (flag) {
            fn();
            flag = false;
            setTimeout(() => {
                flag = true;
            }, limit);
        }
    };
}

window.addEventListener("scroll", throttle(fn, 2000));