export function addToCart() {
  this.userState = {
    ...this.userState,
    cart: [...this.userState.cart, this.product.id],
  };
  console.log(this.userState);
}
