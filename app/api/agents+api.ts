import fs from "fs";
export async function GET(request: Request) {
  const response = await fs.promises.readFile(
    "app/data/agentsList.json",
    "utf-8"
  );
  const Agents = await JSON.parse(response);

  if (!Agents.length) {
    return Response.json({ message: "No agents found." }, { status: 404 });
  }
  return Response.json({ agentsList: Agents });
}
