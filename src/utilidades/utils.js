export function addToCart() {
  this.userState = {
    ...this.userState,
    cart: [...this.userState.cart, this.product.id],
  };
  this.requestUpdate();
  console.log(this.userState);
}
