let products = []; //Array to store result of fetch API

//Function to call Api
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

//Function to create cards of the products fetched from the api
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
        <p>Price: ₹${price}</p>
        <p>Rating: ⭐${rating}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        divObj.appendChild(card);

        //console.log(title, description, price, category, rating, imageurl);
    }
}
fetchProduct();

//Function to add items to cart and store it in localstorage
function addToCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    findCartLength()
    alert("Item added to cart")
}

//function the find number of items in the cart
function findCartLength(){
    let items = JSON.parse(localStorage.getItem("cart")) || [];
    let element = document.getElementById("total-items")
    element.innerText = items.length
}
document.addEventListener("DOMContentLoaded", findCartLength); //use to call findcartlength whenever the page loads

//function to get items from the localstorage and show it in cart page
function getFromCart(){
    let products = JSON.parse(localStorage.getItem("cart")) || [];
    const divObj = document.getElementById("cart-container");

    if(products.length === 0){
        divObj.innerHTML = '<h3 id="empty-cart">Your Cart Is Empty</h3>'
        return;
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
        <p>Price: ₹${price}</p>
        <p>Rating: ⭐${rating}</p>
        <button class="btn">Place Order</button>
        `;

        divObj.appendChild(card);
    }

    calculate()
}
document.addEventListener("DOMContentLoaded", getFromCart);

//function to search products from products array
function searchProduct(){
    let input = document.getElementById("search-input").value.toLowerCase();
    let matchedData = products.filter((product) => product.title.toLowerCase().includes(input));
    displaySearchProducts(matchedData);
}

//function to display the products that is searched
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
        <p>Price: ₹${price}</p>
        <p>Rating: ⭐${rating}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;

        divObj.appendChild(card);

        //console.log(title, description, price, category, rating, imageurl);
    }
}

//implementation of debounce
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

//function to write in console when scrolling
function writeInConsole(){
    console.log("Scrolling...")
}

//implementation of throtle
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
window.addEventListener("scroll", throttle(writeInConsole, 2000));


//function to find the number of items in cart and calculate the total price of that item
function calculate(){
    let items = JSON.parse(localStorage.getItem("cart") || []);
    let totalItem = items.length;
    let totalPrice = 0;

    totalPrice = items.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    let itemObj = document.getElementById("total-items")
    let priceObj = document.getElementById("total-price")

    itemObj.innerText = totalItem
    priceObj.innerText = totalPrice
}