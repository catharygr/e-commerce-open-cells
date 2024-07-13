export async function fetchData() {
  const response = await fetch('http://localhost:3000/products');
  const data = await response.json();
  return data;
}

export async function editProduct() {}
export async function deleteProduct() {}
export async function addProduct() {}
