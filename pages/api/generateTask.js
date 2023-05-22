import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { conceptWord, randomQuestion } = req.body;
  const random = Math.floor(Math.random() * (200 - 0 + 1));
  const numChoices = completion.data.choices.length;
  console.log(random, numChoices);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(conceptWord, randomQuestion),
    temperature: 0,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[random].text });
}

function generatePrompt(conceptWord, randomQuestion) {
  return `Im a high-school pupil and Im trying to learn chemisty. The subject that Im learning is ${conceptWord}. Please generate a task to solve related to it. For example ${randomQuestion}.`;
}
