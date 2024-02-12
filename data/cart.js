export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [];
}
//save the item to cart
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addtocart(productId, productQuantity) {
  let matchingItem;
  cart.forEach((CartItem) => {
    if (productId === CartItem.productId) {
      matchingItem = CartItem;
    }
  });

  // if the

  if (matchingItem) {
    matchingItem.itemQuantity += productQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      itemQuantity: productQuantity,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  /*   renderCheckout(); */
  saveToStorage();
}

export function updateDelivery(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((CartItem) => {
    if (productId === CartItem.productId) {
      matchingItem = CartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
