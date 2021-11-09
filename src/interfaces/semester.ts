import { Course } from "./course";

export enum YearType {
    FirstYear = "First Year",
    SecondYear = "Second Year",
    ThirdYear = "Third Year",
    FourthYear = "Fourth Year",
    PoolOfCourses = "Pool of Courses"
}

export enum SemesterType {
    Fall = "Fall",
    Spring = "Spring",
    PoolOfCourses = "Pool of Courses"
}

export interface Semester {
    year: YearType
    semester: SemesterType
    courses: Course[]
}