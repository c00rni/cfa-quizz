"use client";
import Image from "next/image";
import CategoryButton from "./categoryButton";
import Navigation from "./navigation";
import Question, { Category } from "./question";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { getCategories, onAuthStateChangedHelper } from "./firebase/firebase";



// Display Home page
export default function Home() {
  const [quizzType, setQuizzType] = useState<Category | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const unsubcribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    const initCategories = async () => {
      setCategories(await getCategories());
    }
    initCategories();
    //Clearnup subscript user on unmont
    return () => unsubcribe()
  }, [])

  return (
    <>
      <div className="flex flex-col min-h-[100vh] w-[100%]">
        <Navigation user={user} className="h-[10vh] xl:h-[20vh]" />
        <main className="xl:flex xl:items-baseline xl:flex-1 xl:gap-24">
          {quizzType == null ? (
            <>
              <div className="m-8 md:flex-[1]">
                <h1 className="text-headingRegular font-light">
                  Welcome to the
                </h1>
                <h1 className="text-headingRegular font-bold">CFA Quizz!</h1>
                <p className="italic text-grayNavy text-semiMedium">
                  Pick a subject to get started.
                </p>
              </div>

              <div className="flex flex-col pt-4 gap-4 sm:pt-6 sm:gap-6 md:flex-1">
                {categories.map((category) => {
                  return (
                      <div key={category.id}>
                        <CategoryButton
                          color={category.color}
                          category={category}
                          setQuizzType={setQuizzType}
                        >
                          <Image
                            sizes="(max-width: 390px) 25px, (max-width: 1200) 40px"
                            src={require(`${category.icon}`)}
                            alt={category.id}
                          />
                        </CategoryButton>
                      </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <Question quizzType={quizzType} setQuizzType={setQuizzType} />
            </>
          )}
        </main>
      </div>
    </>
  );
}
