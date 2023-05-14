import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { question, answer } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(question, answer),
    temperature: 0,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(question, answer) {
  return `By given this chemistry equation " ${question} ", give me only one hint how to solve it. Here is the given answer to double check for your information not be missleading  " ${answer}". Dont write anything unnecessary`;
}
