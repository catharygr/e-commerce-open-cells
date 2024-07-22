export async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en fetch:', error);
  }
}

export async function editProduct() {
  console.log('editProduct');
}
export async function deleteProduct() {}
export async function addProduct() {}
