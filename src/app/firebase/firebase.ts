// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, onAuthStateChanged, User, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc, deleteDoc, CollectionReference } from "firebase/firestore";
import { Category, Question } from "../question";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  //storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  //messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  //measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

// Authenticate with a user
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOut() {
    return auth.signOut();
}

export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}

// Get all category
export async function getCategories() {
    const categories:Array<Category> = [];
    try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        querySnapshot.forEach((doc) => {
            const {color , functionArea , icon} = doc.data()
            categories.push({id: doc.id, icon, color, functionArea});
        });
    } catch(e) {
        console.log(e)
    }
    return categories;
}

// add a Categories
export async function addCategory(title: string, icon: string, color: string, functionArea: string) {
    try {
        await setDoc(doc(db, "categories", title), {
            icon: icon,
            color: color,
            functionArea: functionArea
        });
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    return false;
}

// add a question to a catagory
export async function addQuestion(question: string, options: Array<string>, answer: string, seconds: number, mastery:string, category: Category) {
    try {
        const docRef = await addDoc(collection(db, "categories",  category.id, "questions"), {
            question: question,
            options: options,
            answer: answer,
            time: seconds,
            mastery: mastery,
        });
        console.log("Document written with ID: ", docRef.id);
        return true
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    return false
}

// supprimer une question d'une category
export async function deleteQuestion(categoryId: string, questionId: string) {
    try {
        await deleteDoc(doc(db, "categories", categoryId, "questions", questionId));
        console.log(`Document ${questionId} deleted.`)
    } catch (e) {
       console.error("Error adding document: ", e);
    }
}

// Get all question of a category
export async function getCategoryQuestions(catagory: Category) {
    const querySnapshot = await getDocs(collection(db, "categories", catagory.id, "questions"));
    const questions:Array<Question> = [];
    querySnapshot.forEach((doc) => {
        const {answer, mastery, options, question, time} = doc.data()
        questions.push({id: doc.id, question, options, answer, time, mastery: mastery});
    });
    return questions;
}
