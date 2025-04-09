document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ product-details.js Loaded!");

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));

    if (typeof allProducts === "undefined") {
        console.error("❌ ERROR: 'allProducts' is not defined. Check if 'products.js' is loaded first.");
        return;
    }

    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        document.body.innerHTML = `
            <h2 style="text-align: center; color: red;">Product not found</h2>
            <p style="text-align: center;">Go back to <a href="products.html">Products</a></p>
        `;
        return;
    }

    // Populate product details
    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `₹${product.price}`;
    document.getElementById("product-description").textContent = product.description;

    // Quantity Handling
    let quantity = 1;
    document.getElementById("increase").addEventListener("click", () => {
        quantity++;
        document.getElementById("quantity").textContent = quantity;
    });

    document.getElementById("decrease").addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            document.getElementById("quantity").textContent = quantity;
        }
    });

    // Add to Cart Button
    document.getElementById("addToCartBtn").addEventListener("click", function () {
        addToCart(product.id, quantity);
    });

    // Buy Now Button
    document.getElementById("buyNowBtn").addEventListener("click", function () {
        buyNow(product.id, quantity);
    });

    // Update cart count
    updateCartCount();
});

// Function to add product to cart
function addToCart(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = allProducts.find(p => p.id === productId);

    if (product) {
        let existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart! 🛒`);
    } else {
        console.error("❌ ERROR: Product not found in database.");
    }
}

// Function to handle Buy Now
function buyNow(productId, quantity) {
    let product = allProducts.find(p => p.id === productId);
    if (product) {
        let checkoutProduct = [{ ...product, quantity }];
        localStorage.setItem("checkout", JSON.stringify(checkoutProduct));
        window.location.href = "checkout.html";
    } else {
        console.error("❌ ERROR: Product not found.");
    }
}

// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let cartCountElement = document.getElementById("headerCartCount");

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Run this function on page load to update the cart count
document.addEventListener("DOMContentLoaded", updateCartCount);
