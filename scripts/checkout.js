import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

function renderCheckout() {
  renderOrderSummary();
  renderPaymentSummary();
}
renderCheckout();
export { renderCheckout };
