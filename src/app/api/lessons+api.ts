import fs from "fs";
export async function GET(request: Request) {
  const response = await fs.promises.readFile(
    "src/data/lessonsList.json",
    "utf8"
  );
  const Lessons = await JSON.parse(response);
  if (!Lessons.length) {
    return Response.json({ message: "No lessons found." }, { status: 404 });
  }
  return Response.json({ lessonsList: Lessons });
}
