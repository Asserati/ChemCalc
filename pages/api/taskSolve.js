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
  return `Chemistry equation: ${question}. Set the initial data (what is given). 2)Determine the final data (results, what to find).
  3)Select the appropriate formula(s). 4)Define intermediate data (what else is needed for the task). 5)Determine methods (select tables, formulas) for searching intermediate data. 6)Check whether the measurement units of the physical quantities used are unified. 7)Perform the necessary calculations according to the formulas. 8)Write the received answer.. Here is the given answer to double check for your information not be missleading  " ${answer}". Dont write anything unnecessary`;
}
