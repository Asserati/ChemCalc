import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { concept, example } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(concept, example),
    temperature: 0,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(concept, example) {
  return `Generate an task to solve chemistry that is related with ${concept} for high-school students. For example: "${example}" A bit harder one to solve.`;
}
