
import { LessonsList, QuestionsJson } from "@/src/types/types";
import fs from "fs";




export async function GET(_request: Request, { id }: Record<string, string>) {
  const data = await fs.promises.readFile("src/data/quizQuestions.json", "utf8");

  if (!data.length) {
    return Response.json({ message: "Lesson not found." }, { status: 404 });
  }
    const Quiz: QuestionsJson[] = JSON.parse(data);
    const questions = Quiz.filter((que) => que.id === +id);
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
  const data = await fs.promises.readFile("src/data/quizQuestions.json", "utf8");

    if (!data.length) {
      return Response.json({ message: "Lesson not found." }, { status: 404 });
    }
    const Quiz: QuestionsJson[] = JSON.parse(data);
    const questions = Quiz.filter((que) => que.id === +id);

    if (!questions.length) {
      return Response.json({ message: "Lesson not found." }, { status: 404 });
    }
    const updatedQuestion = questions[0].questions.map((que) =>
      que.index === questionIndex ? { ...que, answered: true } : que
    );
    const updatedQuiz = Quiz.map((questions) =>
      questions.id === +id
        ? { ...questions, questions: updatedQuestion }
        : questions
    );

    await fs.promises.writeFile(
      "src/data/quizQuestions.json",
      JSON.stringify(updatedQuiz)
    );


    const response = await fs.promises.readFile("src/data/lessonsList.json", "utf8");
    const lessonList: LessonsList[] = await JSON.parse(response);
    if (questions[0].total === +questionIndex) {
      const updateCurrentLesson = lessonList.map((lesson) =>
        lesson.lesson === +id
          ? { ...lesson, disabled: false, completed: true }
          : lesson
      );

      const updateLessonList = updateCurrentLesson.map((lesson, idx) =>
        lesson.lesson === +id + 1 && idx < updateCurrentLesson.length
          ? { ...lesson, disabled: false }
          : lesson
      );

      await fs.promises.writeFile(
      "src/data/lessonsList.json",
      JSON.stringify(updateLessonList)
    );


    }

    const nextLesson = updatedQuiz.filter((que) => que.id === +id);

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
