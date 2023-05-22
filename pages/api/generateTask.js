import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { conceptWord, randomQuestion } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(conceptWord, randomQuestion),
    temperature: 0,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(conceptWord, randomQuestion) {
  return `Generate an task to solve chemistry that is related with ${conceptWord} for high-school students. For example: "${randomQuestion}" A bit harder one to solve.`;
}
