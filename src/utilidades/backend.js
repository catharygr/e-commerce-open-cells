export async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en fetch:', error);
  }
}

export async function editProduct(product) {
  try {
    const response = await fetch(
      `http://localhost:3000/products/${product.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en fetch:', error);
  }
}
export async function deleteProduct() {}
export async function addProduct() {}
