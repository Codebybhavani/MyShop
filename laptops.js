document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ laptops.js Loaded!");

    const laptopList = document.getElementById("laptop-list");

    if (!laptopList) {
        console.error("❌ ERROR: 'laptop-list' container not found. Check your HTML file.");
        return;
    }

    // Ensure `allProducts` is available
    if (typeof allProducts === "undefined" || !Array.isArray(allProducts)) {
        console.error("❌ ERROR: 'allProducts' is not defined or not an array! Check if 'products.js' is loaded.");
        return;
    }

    console.log("📢 All Products:", allProducts); // Debugging

    // Normalize categories for case sensitivity issues
    const laptops = allProducts.filter(product => 
        product.category && product.category.toLowerCase() === "laptops"
    );

    console.log("🔍 Found Laptops:", laptops.length);

    if (laptops.length === 0) {
        console.warn("⚠️ No laptops found in allProducts. Check category names in 'products.js'.");
        laptopList.innerHTML = "<p>No laptops available.</p>";
        return;
    }

    // Populate laptops dynamically
    laptopList.innerHTML = laptops.map(laptop => `
        <div class="product">
            <div class="like"><i class="fa fa-heart heart-icon"></i></div>
            <div class="product_category"><img src="${laptop.image}" alt="${laptop.name}"></div>
            <div class="name">${laptop.name}</div>
            <div class="price">${laptop.price}</div>
            <div class="shopping">
                <a href="product-details.html?id=${laptop.id}" class="buy-btn">Buy Now</a>
                <i class="fa fa-shopping-cart cart-icon"></i>
            </div>
        </div>
    `).join('');

    console.log("✅ Laptops Loaded Successfully!");
});
