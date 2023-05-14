import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { labels, findUnit } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(labels, findUnit),
    temperature: 0,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(labels, findUnit) {
  return `Solve only in chemistry terms: I have given these units " ${labels} ", and I need to find " ${findUnit}". Please show the formulas and the calculations with operation symbols. Don't write anything unnecessary`;
}
