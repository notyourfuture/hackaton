export const calcSubPrice = (cartAuto) => {
  return cartAuto.count * cartAuto.auto.price;
};

export const calcTotalPrice = (autos) => {
  let totalPrice = 0;
  autos.forEach((item) => {
    totalPrice += item.subPrice;
  });
  return totalPrice;
};
