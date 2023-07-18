const productsContainer = document.querySelector(".products-container");

const displayProducts = (list) => {
  productsContainer.innerHTML = list
    .map((item) => {
      return `
        <article class="product">
        <div role="button" data-id=${item.id} class="big-btn">
        <img src='${item.image}'>
        <div class="product-info">
        <h2>${item.name}</h2>
        ${
          item.superDiscount
            ? `<p class="super-price">$${item.superDiscountPrice}</p><p class="initial-price"> da $${item.price}</p><span class="super-discount">Super offerta</span>`
            : item.discount
            ? `<p class="discount-price">$${item.discountPrice}</p><p class="initial-price"> da $${item.price}</p>`
            : `<p class="price">$${item.price}</p>`
        }
        </div>  
        </div>
         <div class="product-btn">
         <button class="heart-btn"><i class="fa-solid fa-heart"></i></button>
        <button class="cart-btn" data-id="${
          item.id
        }"><i class="fa-solid fa-cart-shopping"></i></button>
        </article>
        `;
    })
    .join("");
};

export default displayProducts;
