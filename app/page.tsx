"use client";
import HomeCard from "@/components/quiz/HomeCard";
import { useGlobalContext } from "@/context/GlobalContext";
import { ICategory } from "@/types/type";

export default function Home() {
  const { categories } = useGlobalContext();
  return (
    <div className="h-full ">
      <h1 className="text-4xl font-bold">Quiz Catelog</h1>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]  gap-6">
        {categories.map((category: ICategory) => (
          <HomeCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
