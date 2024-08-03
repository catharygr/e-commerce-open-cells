export function addToCart() {
  if (!this.userState) {
    this.userState = { cart: [], favorites: [] };
  }
  this.userState = {
    ...this.userState,
    cart: [...this.userState.cart, this.product.id.toString()],
  };
  this.requestUpdate();
}

export function isProductInCart() {
  if (!this.userState) return false;
  return this.userState.cart.includes(this.product.id.toString());
}
