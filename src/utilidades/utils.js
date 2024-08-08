export function addToCart() {
  if (!this.userState) {
    this.userState = { cart: [], favorites: [] };
  }
  this.userState = {
    ...this.userState,
    cart: [...this.userState?.cart, { ...this.product, quantity: 1 }],
  };
}

export function addToFav() {
  if (!this.userState) {
    this.userState = { cart: [], favorites: [] };
  }
  this.userState = {
    ...this.userState,
    favorites: [...this.userState?.favorites, this.product],
  };
}
