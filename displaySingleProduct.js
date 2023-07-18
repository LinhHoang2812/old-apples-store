import { products } from "./data.js";

const modalDetail = document.querySelector(".modal-detail");

const displaySingleProduct = (id) => {
  const product = products.find((product) => product.id.toString() === id);

  modalDetail.innerHTML = `
<article class="single-product">
<div class="single-product-img">
<img src="${product.image}">
</div>
<div class="single-product-detail">
<h2>${product.name}</h2>
<p>${product.description}</p>
${
  product.superDiscount
    ? `<p class="super-price">$${product.superDiscountPrice}</p><p class="initial-price"> da $${product.price}</p><span class="super-discount">Super offerta</span>`
    : product.discount
    ? `<p class="discount-price">$${product.discountPrice}</p><p class="initial-price"> da $${product.price}</p>`
    : `<p class="price">$${product.price}</p>`
}
</div>
</article>
`;
};
export default displaySingleProduct;
