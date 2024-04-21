
"use client";
import Navigation from "../navigation";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { addCategory, addQuestion, deleteQuestion, getCategories, getCategoryQuestions, onAuthStateChangedHelper } from "../firebase/firebase";
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Category } from "../question";


let errorMessageSchemat = Yup.object().shape({
   title: Yup.string()
     .min(4, 'Too Short!')
     .required('Required'),
   icon: Yup.string(),
   color: Yup.string(),
   functionArea: Yup.string()
 });
let errorMessageSchematQuestion = Yup.object().shape({
  question: Yup.string()
     .min(4, 'Too Short!')
     .required('Required'),
  awnser: Yup.string().required("Required"),
  option1: Yup.string().required("Required"),
  option2: Yup.string().required("Required"),
  option3: Yup.string().required("Required"),
  option4: Yup.string().required("Required"),
  seconds: Yup.number().min(1).max(600),
  mastery: Yup.string(),
});

// Display Home page
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Array<Category>>([]);

  useEffect(() => {
    const unsubcribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    const initData = async () => {
      const _categories = await getCategories();
      for (let i = 0; i < _categories.length; i++) {
        const _questions = await getCategoryQuestions(_categories[i])
        _categories[i].questions = _questions;
      }
      setCategories(_categories);
    }
    initData();

    //Clearnup subscript user on unmont
    return () => unsubcribe()
  }, [])


  return (
    <>
      <div className="flex flex-col min-h-[100vh] w-[100%]">
        <Navigation user={user} className="h-[10vh] xl:h-[20vh]" />
        <main className="max-w-[1024px] self-center">
            {(user && user.uid == process.env.NEXT_PUBLIC_ADMIN_UID)  && (
                <>
                    <h1 className="text-medium font-bold mb-4">Category</h1>
                    <Formik
                        initialValues={{title: "", icon: "", color: "", functionArea: ""}}
                        validationSchema={errorMessageSchemat}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                          if ( await addCategory(values.title, values.icon, values.color, values.functionArea)) {
                            toast.success('Cathegory created!', {
                                  position: "top-center",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light",
                                  transition: Bounce,
                            });
                            resetForm()
                          } else {
                                toast.error('Error', {
                                  position: "top-center",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light",
                                  transition: Bounce,
                                });
                          }
                        }}>
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                      <label htmlFor="title" className="text-grayNavy text-semiMedium">Title</label>
                                      <Field id="title" type="text" name="title" className="text-regular p-4 rounded-[12px]"/>
                                      <ErrorMessage name="title" component="div" className="text-red"/>
                                    </div>

                                    <div className="flex flex-col">
                                      <label htmlFor="icon" className="text-grayNavy text-semiMedium">Icon path</label>
                                      <Field id="icon" type="text" className="text-regular p-4 rounded-[12px]" name="icon" />
                                      <ErrorMessage name="icon" component="div" className="text-red"/>
                                    </div>

                                    <div className="flex flex-col">
                                      <label htmlFor="color" className="text-grayNavy text-semiMedium">Color</label>
                                      <Field id="color" type="text" className="text-regular p-4 rounded-[12px]" name="color" />
                                      <ErrorMessage name="color" component="div" className="text-red"/>
                                    </div>

                                    <div className="flex flex-col">
                                      <label htmlFor="functionArea" className="text-grayNavy text-semiMedium">Functional Area</label>
                                      <Field id="functionArea" className="text-regular p-4 rounded-[12px]" name="functionArea" as="select">
                                          <option value="Investment Tools">Investment Tools</option>
                                          <option value="Asset Valuation">Asset Valuation</option>
                                          <option value="Portfolio Management">Portfolio Management</option>
                                          <option value="Ethical ans Professional Standards">Ethical ans Professional Standards</option>
                                      </Field>
                                      <ErrorMessage name="functionArea" component="div" className="text-red"/>
                                    </div>

                                    <button type="submit" className="text-regular bg-purple rounded-[12px] text-white hover:bg-opacity-30 py-4 flex justify-center items-center">
                                      { isSubmitting && (
                                        <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>)}
                                        Add category
                                      </button>
                                </Form>
                            )}
                    </Formik>
                    <ToastContainer/>
                    <h1 className="text-medium font-bold mb-4 mt-20">Question</h1>
                    <Formik
                        initialValues={{question: "", option1: "", option2: "", option3: "", option4: "", awnser: "", seconds: 30, mastery: "", category: 0}}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                          if (await addQuestion(values.question, [values.option1, values.option2, values.option3, values.option4], values.awnser, values.seconds, values.mastery, categories[values.category])) {
                            toast.success('Cathegory created!', {
                                  position: "top-center",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light",
                                  transition: Bounce,
                            });
                            resetForm()
                          } else {
                                toast.error('Error', {
                                  position: "top-center",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light",
                                  transition: Bounce,
                                });
                          }
                        }}>
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                      <label htmlFor="question" className="text-grayNavy text-semiMedium">Question</label>
                                      <Field id="question" type="text" name="question" className="text-regular p-4 rounded-[12px]"/>
                                      <ErrorMessage name="question" component="div" className="text-red"/>
                                    </div>

                                    <div className="flex flex-col">
                                      <label htmlFor="anwser" className="text-grayNavy text-semiMedium">Awnser</label>
                                      <Field id="awnser" type="text" name="awnser" className="text-regular p-4 rounded-[12px]"/>
                                      <ErrorMessage name="awnser" component="div" className="text-red"/>
                                    </div>

                                    <div className="flex flex-col">
                                      <label htmlFor="option1" className="text-grayNavy text-semiMedium">Options</label>
                                      <Field id="option1" type="text" className="text-regular p-4 rounded-[12px]" name="option1" placeholder="Options 1" />
                                      <ErrorMessage name="option1" component="div" className="text-red"/>
                                    </div>

                                    <div className="flex flex-col">
                                      <Field id="option2" type="text" className="text-regular p-4 rounded-[12px]" name="option2" placeholder="Options 2"/>
                                      <ErrorMessage name="option2" component="div" className="text-red"/>
                                    </div>

                                    <div className="flex flex-col">
                                      <Field id="option3" type="text" className="text-regular p-4 rounded-[12px]" name="option3" placeholder="Options 3"/>
                                      <ErrorMessage name="option3" component="div" className="text-red"/>
                                    </div>

                                    <div className="flex flex-col">
                                      <Field id="option4" type="text" className="text-regular p-4 rounded-[12px]" name="option4" placeholder="Options 4"/>
                                      <ErrorMessage name="option4" component="div" className="text-red"/>
                                    </div>



                                    <div className="flex flex-col">
                                      <label htmlFor="seconds" className="text-grayNavy text-semiMedium">Seconds</label>
                                      <Field id="seconds" type="number" className="text-regular p-4 rounded-[12px]" name="seconds" />
                                      <ErrorMessage name="seconds" component="div" className="text-red"/>
                                    </div>

                                     <div className="flex flex-col">
                                      <label htmlFor="mastery" className="text-grayNavy text-semiMedium">Mastery</label>
                                      <Field id="mastery" type="text" name="mastery" className="text-regular p-4 rounded-[12px]"/>
                                      <ErrorMessage name="mastery" component="div" className="text-red"/>
                                    </div>

                                    <div className="flex flex-col">
                                      <label htmlFor="category" className="text-grayNavy text-semiMedium">Category</label>
                                      <Field id="category" className="text-regular p-4 rounded-[12px]" name="category" as="select">
                                          {categories.map((category, index) => {
                                            return <option key={category.id} value={index}>{category.id}</option>
                                            })}
                                     </Field>
                                      <ErrorMessage name="category" component="div" className="text-red"/>
                                    </div>

                                    <button type="submit" className="text-regular bg-purple rounded-[12px] text-white hover:bg-opacity-30 py-4 flex justify-center items-center">
                                      { isSubmitting && (
                                        <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>)}
                                        Add category
                                      </button>
                                </Form>
                            )}
                    </Formik>
                    <h1 className="text-medium font-bold mb-4 mt-20">Delete</h1>
                    <Formik
                        initialValues={{ids: ""}}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                          setSubmitting(true)
                          const [CategoryId, questionId]= values.ids.split(":")
                          console.log(values)
                          await deleteQuestion(CategoryId, questionId);
                          setSubmitting(false)
                        }}>
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                      <label htmlFor="ids" className="text-grayNavy text-semiMedium">Questions</label>
                                      <Field id="ids" className="text-regular p-4 rounded-[12px]" name="ids" as="select">
                                          <option value="" disabled >Choose a question</option>
                                          {categories.map((category) => {
                                            return category.questions?.map(question => {
                                              return <option key={question.id} value={category.id+":"+question.id}>{category.id+" - "+question.question}</option>
                                            })
                                          })}
                                      </Field>
                                      <ErrorMessage name="ids" component="div" className="text-red"/>
                                    </div>

                                    <button type="submit" className="text-regular bg-purple rounded-[12px] text-white hover:bg-opacity-30 py-4 flex justify-center items-center">
                                      { isSubmitting && (
                                        <svg aria-hidden="true" className="w-8 h-8 text-white animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>)}
                                        Delete question
                                    </button>
                                </Form>
                            )}
                    </Formik>
                 </>
            )}
        </main>
      </div>
    </>
  );
}
