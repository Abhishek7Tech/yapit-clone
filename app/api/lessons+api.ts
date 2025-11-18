import LessonsList from "../utils/lessonsList";
const Lessons = LessonsList;
export function GET(request: Request) {
return Response.json({lessonsList: Lessons})
}