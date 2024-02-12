export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 1000.0,
  },
  {
    id: "3  ",
    deliveryDays: 1,
    priceCents: 3000.0,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  // get the delivery option index to see if the radio button match the delivery index and change price depending of the delivery option choose
  let deliveryOption;
  deliveryOptions.forEach((dlvryOption) => {
    if (dlvryOption.id === deliveryOptionId) {
      deliveryOption = dlvryOption;
    }
  });
  return deliveryOption;
}
