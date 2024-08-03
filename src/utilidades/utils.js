export function addToCart() {
  if (!this.userState) {
    this.userState = { cart: [], favorites: [] };
  }
  this.userState = {
    ...this.userState,
    cart: [...this.userState?.cart, this.product],
  };
}
