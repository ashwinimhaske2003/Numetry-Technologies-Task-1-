document.addEventListener('DOMContentLoaded', async function() {
    const cartItemsElement = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');

   
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    
    let totalAmount = 0;

   
    for (const itemName in cart) {
        const item = cart[itemName];
        if (item.addedToCart) {
            const productDetails = await getProductDetails(itemName); 
            if (productDetails) {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('productItems');

                const itemImage = document.createElement('img');
                itemImage.src = productDetails.image;

                const itemTitle = document.createElement('h5');
                itemTitle.textContent = productDetails.title;

                const itemVendor = document.createElement('h6');
                itemVendor.textContent = productDetails.vendor;

                const itemPrice = document.createElement('h6');
                itemPrice.textContent = `Price Rs. ${productDetails.price} | Quantity: ${item.count}`;

                cartItemDiv.appendChild(itemImage);
                cartItemDiv.appendChild(itemTitle);
                cartItemDiv.appendChild(itemVendor);
                cartItemDiv.appendChild(itemPrice);

                cartItemsElement.appendChild(cartItemDiv);

                totalAmount += productDetails.price * item.count; 
            }
        }
    }

    totalAmountElement.textContent = `Rs. ${totalAmount}`; 

 
    const resetAllButton = document.getElementById('resetAllButton');
    resetAllButton.addEventListener('click', function() {
        localStorage.removeItem('cart'); 
        cartItemsElement.innerHTML = ''; 
        totalAmountElement.textContent = ''; 
        cart = {}; 
    });

    
    async function getProductDetails(productName) {
        try {
            const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
            const data = await response.json();
            const products = data.categories.flatMap(category => category.category_products);
            const product = products.find(product => product.title === productName);
            return product;
        } catch (error) {
            console.error('Error fetching product details:', error);
            return null;
        }
    }
});
