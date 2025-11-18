import generateResults from "../utils/generateResults";

export async function GET(request:Request) {
    const accuracy = Math.floor(Math.random() * 100) + 1;
    const fluency = Math.floor(Math.random() * 100) + 1;
    const intonation = Math.floor(Math.random() * 100) + 1;

    const result = generateResults(accuracy, fluency, intonation);
    return Response.json({result}, {status: 200});
}