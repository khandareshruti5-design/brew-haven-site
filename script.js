// ===== MOBILE MENU =====
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

if (menuOpenButton) {
    menuOpenButton.addEventListener("click", () => {
        document.body.classList.add("show-mobile-menu");
    });
}

if (menuCloseButton) {
    menuCloseButton.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
    });
}

// ===== CART LOGIC =====
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const clearBtn = document.getElementById('clear-cart-btn');

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];
    let total = 0;

    if (!cartList) return; // Agar cart page par nahi hain toh function rok do

    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = "<p>Your cart is empty ☕</p>";
        cartTotal.innerText = "Total: ₹0";
        return;
    }

    cart.forEach((item, index) => {
        // Price string ho sakti hai, isliye Number() use karein
        const itemPrice = Number(item.price) || 0;
        total += itemPrice;

        cartList.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" style="width:50px;">
                <span>${item.name}</span>
                <span>₹${itemPrice}</span>
            </div>
        `;
    });

    cartTotal.innerText = "Total: ₹" + total;
}

// Clear Cart Functionality
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        localStorage.removeItem('coffeeCart');
        loadCart();
    });
}

// Page load hote hi cart check karein
document.addEventListener("DOMContentLoaded", loadCart);



// ===== ADD TO CART FUNCTION =====
function addToCart(name, price, img) {
    // 1. Pehle se saved cart uthayein ya khali array lein
    let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];

    // 2. Naya item object banayein
    const newItem = {
        name: name,
        price: Number(price),
        img: img
    };

    // 3. Cart mein add karein
    cart.push(newItem);

    // 4. LocalStorage mein save karein
    localStorage.setItem('coffeeCart', JSON.stringify(cart));

    // 5. User ko feedback dein
    alert(name + " added to cart! ☕");
}