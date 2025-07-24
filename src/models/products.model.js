

// console.log(products);

import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (data) => {
  try {
    const docRef = doc(productsCollection); // crea referencia con ID propio
    const newProduct = { id: docRef.id, ...data };
    await setDoc(docRef, newProduct); // guarda el ID como parte del documento
    return newProduct;
  } catch (error) {
    console.error(error);
  }
};


// PUT
export async function updateProduct(id, productData) {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return false;
    }

    await setDoc(productRef, productData); // reemplazo completo
    return { id, ...productData };
  } catch (error) {
    console.error(error);
  }
}

export const deleteProduct = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return false;
    }

    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error(error);
  }
};