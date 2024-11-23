import { db, auth } from "../firebase/firebaseConfig";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";

const Methods = {
  // Sign Up User
  signUpUser: (email, password) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          resolve(user);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  },
  // Sign In User
  signInUser: (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          resolve(user);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  },
  // Google Authentication
  googleAuthentication: (idToken) => {
    return new Promise(async (resolve, reject) => {
      try {
        const credential = GoogleAuthProvider.credential(idToken);
        const userCredential = await signInWithCredential(auth, credential);
        resolve(userCredential);
      } catch (error) {
        console.log("Google Authentication Error:", error);
        reject(error);
      }
    });
  },
  // Add Data in database
  addDatainDb: (collectionName, id, obj) => {
    return new Promise((resolve, reject) => {
      setDoc(doc(db, collectionName, id), obj);
      if (obj) {
        resolve("Data Added Successfully with " + id);
      } else {
        reject("Data Not Added");
      }
    });
  },
  // Sign Out User
  signOutUser: () => {
    return new Promise((resolve, reject) => {
      signOut(auth)
        .then(() => {
          resolve("Sign Out Successfully");
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  },
  // All Documents
  getAllDocuments: (collectionName) => {
    const collectionArr = [];
    return new Promise((resolve, reject) => {
      getDocs(collection(db, collectionName))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            collectionArr.push(doc.data());
          });
          resolve(collectionArr);
        })
        .catch((error) => {
          reject("Error in fetching all documents");
        });
    });
  },
  // Single Document
  getSingleData: (collectionName, id) => {
    return new Promise((resolve, reject) => {
      getDoc(doc(db, collectionName, id))
        .then((doc) => {
          resolve(doc.data());
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  },
  // Update Document
  updateDocument: (collectionName, id, obj) => {
    return new Promise((resolve, reject) => {
      const docRef = doc(db, collectionName, id);
      updateDoc(docRef, obj)
        .then(() => {
          resolve("Document Updated Successfully " + id);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  },
  // Delete Document
  deleteDocument: (collectionName, id) => {
    return new Promise((resolve, reject) => {
      deleteDoc(doc(db, collectionName, id))
        .then(() => {
          resolve("Document Deleted Successfully" + id);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  },
};

// Supabase
// Upload Image
const uploadImage = () => {};
// Supabase
// Get Download Url

const {
  signUpUser,
  signInUser,
  googleAuthentication,
  signOutUser,
  addDatainDb,
  getSingleData,
  updateDocument,
  getAllDocuments,
  deleteDocument,
} = Methods;

export {
  signUpUser,
  signInUser,
  googleAuthentication,
  signOutUser,
  addDatainDb,
  getSingleData,
  updateDocument,
  getAllDocuments,
  deleteDocument,
};

export default Methods;
