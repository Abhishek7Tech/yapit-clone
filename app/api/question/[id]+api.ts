import Quiz from "../../utils/QuizQuestions";
const QuizQuestions = Quiz;
export async function GET(
  _request: Request,
  { id }: Record<string, string>
) {
  const questions = QuizQuestions.filter((que) => que.id === +id);
  if (!questions.length) {
    return Response.json({ message: "Lesson not found." }, { status: 404 });
  }

  const currentQuestion = questions[0].questions.find((que) => que.answered === false);


  return Response.json({question: [{currentQuestion, total: questions[0].total, id: questions[0].id}]}, {status: 200})
}
