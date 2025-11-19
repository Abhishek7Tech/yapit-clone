import LessonsList, { setLessonList } from "@/app/utils/lessonsList";
import Quiz from "../../utils/QuizQuestions";
let QuizQuestions = Quiz;
export async function GET(_request: Request, { id }: Record<string, string>) {
  const questions = QuizQuestions.filter((que) => que.id === +id);
  if (!questions.length) {
    return Response.json({ message: "Lesson not found." }, { status: 404 });
  }

  const currentQuestion = questions[0].questions.find(
    (que) => que.answered === false
  );

  return Response.json(
    {
      question: [
        { currentQuestion, total: questions[0].total, id: questions[0].id },
      ],
    },
    { status: 200 }
  );
}

export async function POST(request: Request, { id }: Record<string, string>) {
  const body = await request.json();
  const questionIndex = +body.index;
  const questions = QuizQuestions.filter((que) => que.id === +id);

  if (!questions.length) {
    return Response.json({ message: "Lesson not found." }, { status: 404 });
  }

  const updatedQuestion = questions[0].questions.map((que) =>
    que.index === questionIndex ? { ...que, answered: true } : que
  );
  QuizQuestions = QuizQuestions.map((questions) =>
    questions.id === +id
      ? { ...questions, questions: updatedQuestion }
      : questions
  );

  if (questions[0].total === +questionIndex) {
    const updateLessonList = LessonsList.map((lesson) =>
      lesson.lesson === +id ? { ...lesson, disabled: false } : lesson
    );
    setLessonList(updateLessonList);
  }

  const nextLesson = QuizQuestions.filter((que) => que.id === +id);

  if (!nextLesson.length) {
    return Response.json({ message: "Lesson not found." }, { status: 404 });
  }

  const nextQuestion = nextLesson[0].questions.find(
    (que) => que.answered === false
  );
  console.log("Next Question:", nextQuestion);
  return Response.json(
    {
      question: [
        {
          currentQuestion: nextQuestion,
          total: nextLesson[0].total,
          id: nextLesson[0].id,
        },
      ],
    },
    { status: 200 }
  );
}
