import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";

export function renderPaymentSummary() {
  let items = 0;
  let shipHandle = 0;
  let quantity = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const product = getProduct(productId);
    items += product.priceCents * cartItem.itemQuantity;
    quantity += cartItem.itemQuantity;
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    shipHandle += deliveryOption.priceCents;
  });
  const totalBeforeTax = items + shipHandle;
  const estimatedTax = totalBeforeTax * 0.1;
  const totalOrder = totalBeforeTax + estimatedTax;
  const paymentSummaryHTML = `
  <div class="payment-summary-title">
  Order Summary
</div>

<div class="payment-summary-row">
  <div>Items (${quantity}):</div>
  <div class="payment-summary-money">$${formatCurrency(items)}</div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">$${formatCurrency(shipHandle)}</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">$${formatCurrency(totalOrder)}</div>
</div>

<button class="place-order-button button-primary">
  Place your order
</button>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
