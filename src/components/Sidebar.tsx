import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";
import { useState } from "react"
import '../styles/global.css'


export function Sidebar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { data } = useGetLessonsQuery()

    return (
        <>
            <div>
                <p className="lg:hidden sm:hidden  absolute top-0 right-0 px-16 py-6 space-y-2">Aulas</p>
                <div
                    className="HAMBURGER-ICON lg:hidden absolute top-0 right-0 px-6 py-6 space-y-2"
                    onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
                >
                    <span className="block h-0.5 w-8 animate-pulse bg-blue-500"></span>
                    <span className="block h-0.5 w-8 animate-pulse bg-blue-500"></span>
                    <span className="block h-0.5 w-8 animate-pulse bg-blue-500"></span>
                </div>
            </div>

            <div className={`${isNavOpen ? "showMenuNav" : "hideMenuNav"}`}>
                <div
                    className="CROSS-ICON lg:hidden absolute top-0 right-0 px-8 py-8"
                    onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
                >
                    <svg
                        className="h-8 w-8 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
                    <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                        Cronograma de aulas
                    </span>

                    <div className=" flex flex-col gap-8">
                        {data?.lessons.map(lesson => {
                            return (
                                <Lesson
                                    key={lesson.id}
                                    title={lesson.title}
                                    slug={lesson.slug}
                                    availableAt={new Date(lesson.availableAt)}
                                    type={lesson.lessonType}
                                />)
                        })}
                    </div>
                </aside>
            </div>
        </>
    )
}