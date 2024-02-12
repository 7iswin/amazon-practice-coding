import { cart, removeFromCart, updateDelivery } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import formatCurrency from "../../scripts/utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
export function renderOrderSummary() {
  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const deliveryOptionId = cartItem.deliveryOptionId;
    const matchingItem = getProduct(productId);
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    //format date of the deliveryORder
    const todayDate = dayjs();
    const deliveryDay = todayDate.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDay.format("dddd, MMMM D");

    //generate the html of the checkout
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
                ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.itemQuantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                    matchingItem.id
                  }">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${deliveryOptionsHTML(matchingItem, cartItem)}
                </div>
              </div>  
            </div>
          </div>
    `;
  });

  //Extension of the html of cartSummaryHTML
  function deliveryOptionsHTML(matchingItem, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const todayDate = dayjs();
      const deliveryDay = todayDate.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDay.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `${formatCurrency(deliveryOption.priceCents)}`;
      const isCheck = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
        <div class="delivery-option js-delivery-option" 
        data-product-id="${matchingItem.id}" 
        data-delivery-option-id="${deliveryOption.id}">
                      <input type="radio"  
                        ${isCheck ? "checked" : ""}
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                      <div> 
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${priceString}
                        </div>
                      </div>
          </div>
        `;
    });
    return html;
  }

  // This is to update the innerhtml of the checkout order
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  //deleting the item on the cart
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const cartContainer = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      cartContainer.remove();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // update the deliveryOptionId if the user make a choose
  document.querySelectorAll(".js-delivery-option").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId, deliveryOptionId } = button.dataset;
      updateDelivery(productId, deliveryOptionId);
      //render again the html if the radio button change
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
