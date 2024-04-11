let productDiv = document.querySelector(".product");
let categoryListDiv = document.querySelector(".categoryList");
let allCatName = [];
let cart = JSON.parse(localStorage.getItem('cart')) || {};

let displayProduct = async (allCheckCat = [], searchText = '') => {
    productDiv.innerHTML = '';
    
    let product = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    let finalProduct = await product.json();

    finalProduct?.categories.forEach((element) => {
        if (!allCatName.includes(element.category_name)) {
            categoryListDiv.innerHTML += ` <label>
                <input type="checkbox" onclick='categoryFilter()' value="${element.category_name}"> &nbsp; ${element.category_name}
            </label>`
            allCatName.push(element.category_name)
            
        }

        if (allCheckCat.length == 0 || allCheckCat.includes(element.category_name)) {
            
            if (element.category_name.toLowerCase() === searchText.toLowerCase()) {
                element.category_products.forEach((item) => {
                    productDiv.innerHTML += `<div class="productItems">
                        <img src=${item.image}>
                        <h6>${item.vendor}</h6>
                        <hr/>
                        <h6>${item.badge_text === null ? "" : item.badge_text}</h6>
                        <h6>Price Rs. ${item.price} | <span>${item.compare_at_price}</span></h6>
                        <h5>${item.title}</h5>
                        <button class="addToCartButton" onclick="addToCart('${item.title}', ${item.price})">Add to Cart</button>
                    </div>`;
                });
            } else {
                element.category_products.forEach((item) => {
                    if (item.title.toLowerCase().includes(searchText.toLowerCase()) ||
                        item.vendor.toLowerCase().includes(searchText.toLowerCase())) {
                        productDiv.innerHTML += `<div class="productItems">
                            <img src=${item.image}>
                            <h6>${item.vendor}</h6>
                            <hr/>
                            <h6>${item.badge_text === null ? "" : item.badge_text}</h6>
                            <h6>Price Rs. ${item.price} | <span>${item.compare_at_price}</span></h6>
                            <h5>${item.title}</h5>
                            <button class="addToCartButton" onclick="addToCart('${item.title}', ${item.price})">Add to Cart</button>
                        </div>`;
                    }
                });
            }
        }
    })
}

let addToCart = (productName, productPrice) => {
    if (cart[productName]) {
        cart[productName].count++;
    } else {
        cart[productName] = {
            price: productPrice,
            count: 1,
            addedToCart: true 
        };
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`${productName} added to cart.`);
};

document.getElementById('viewCartButton').addEventListener('click', () => {
    window.location.href = 'cart.html'; 
});




displayProduct();


