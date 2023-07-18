// `
import { products } from "./data.js";
import displayProducts from "./displayProducts.js";
import displaySingleProduct from "./displaySingleProduct.js";
displayProducts(products);

const navbar = document.querySelector(".navbar");

// category buttons
const btnContainer = document.querySelector(".btn-container");
const btns = ["all", ...new Set(products.map((item) => item.category))];

btnContainer.innerHTML = btns
  .map((btn) => `<button class="category-btn">${btn}</button>`)
  .join(" ");
const categoryBtns = document.querySelectorAll(".category-btn");
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "all") {
      displayProducts(products);
    } else {
      displayProducts(
        products.filter((item) => item.category === btn.textContent)
      );
    }

    // modal popup
    popup();
    // cart
    addCart();
  });
});

// modal popup
function popup() {
  const singleProduct = document.querySelector(".single-product-container");
  const bigBtns = document.querySelectorAll(".big-btn");
  bigBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      singleProduct.classList.add("show-modal");
      navbar.classList.add("show-layout");
      displaySingleProduct(id);
    });
  });
  const closeModal = document.querySelector(".close-modal");
  closeModal.addEventListener("click", () => {
    singleProduct.classList.remove("show-modal");
    navbar.classList.remove("show-layout");
  });
}

popup();

// cart
const cart = document.querySelector(".cart-icon");
const sidebar = document.querySelector(".cart-sidebar");
cart.addEventListener("click", () => {
  sidebar.classList.add("show-cart");
  navbar.classList.add("show-layout");
});

const closeBtn = document.querySelector(".fa-circle-xmark");
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show-cart");
  navbar.classList.remove("show-layout");
});

const countProduct = document.querySelector(".count");
const cartDetail = document.querySelector(".cart-detail");
let count = 0;
const totalPrice = document.querySelector(".total-price span");

function addCart() {
  const cartBtns = document.querySelectorAll(".cart-btn");
  cartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      count++;
      countProduct.textContent = count;
      const id = e.currentTarget.dataset.id;
      const product = products.find((product) => product.id.toString() === id);
      const article = document.createElement("article");
      article.setAttribute("class", "cart-product");
      article.innerHTML = `
        <img src="${product.image}" alt="">
        <div class="cart-product-info">
        <h5>${product.name}</h5>
        ${
          product.superDiscount
            ? `<p class="cart-price">$${product.superDiscountPrice}</p>`
            : product.discount
            ? `<p class="cart-price">$${product.discountPrice}</p>`
            : `<p class="cart-price">$${product.price}</p>`
        }
        </div>
        `;
      cartDetail.appendChild(article);
      totalPrice.textContent = calculateTotal();
    });
  });
}

function calculateTotal() {
  const prices = cartDetail.querySelectorAll(".cart-price");
  let subTotal = 0;
  prices.forEach((price) => {
    subTotal += parseFloat(price.textContent.slice(1));
  });
  return subTotal;
}

addCart();
