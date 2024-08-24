import { db } from './firebase';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

export const getProductsMiddleware = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const addProductMiddleware = async (newProduct) => {
  try {
    await setDoc(doc(db, 'products', newProduct.id.toString), newProduct);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeProductMiddleware = async (id) => {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProductMiddleware = async (product) => {
  try {
    await updateDoc(doc(db, 'products', product.id), product);
  } catch (error) {
    throw new Error(error.message);
  }
};
