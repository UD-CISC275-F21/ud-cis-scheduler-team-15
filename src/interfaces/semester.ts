import { Course } from "./course";

export enum YearType {
    FirstYear = "First Year",
    SecondYear = "Second Year",
    ThirdYear = "Third Year",
    FourthYear = "Fourth Year"
}

export enum SemesterType {
    Fall = "Fall",
    Spring = "Spring"
}

export interface Semester {
    year: YearType
    semester: SemesterType
    courses: Course[]
}