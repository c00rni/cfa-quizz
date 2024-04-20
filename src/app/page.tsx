"use client";
import Image from "next/image";
import CategoryButton from "./categoryButton";
import Navigation from "./navigation";
import Question from "./question";
import { useState } from "react";
import { quizzData } from "./mockdata";

// Display Home page
export default function Home() {
  const [quizzType, setQuizzType] = useState<string>("");

  return (
    <>
      <div className="flex flex-col min-h-[100vh] w-[100%]">
        <Navigation className="h-[10vh] xl:h-[20vh]" />
        <main className="xl:flex xl:items-baseline xl:flex-1 xl:gap-24">
          {quizzType == "" ? (
            <>
              <div className="m-8 md:flex-[1]">
                <h1 className="text-headingRegular font-light">
                  Welcome to the
                </h1>
                <h1 className="text-headingRegular font-bold">Frontend Quiz!</h1>
                <p className="italic text-grayNavy text-semiMedium">
                  Pick a subject to get started.
                </p>
              </div>

              <div className="flex flex-col pt-4 gap-4 sm:pt-6 sm:gap-6 md:flex-1">
                {quizzData.map((category, index) => {
                  return (
                      <div key={index}>
                        <CategoryButton
                          color={category.color}
                          setQuizzType={setQuizzType}
                          text={category.title}
                        >
                          <Image
                            sizes="(max-width: 390px) 25px, (max-width: 1200) 40px"
                            src={require(`${category.icon}`)}
                            alt={category.title}
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
