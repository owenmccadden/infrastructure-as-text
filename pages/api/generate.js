import { Configuration, OpenAIApi } from "openai";

const configuration =  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});



const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
    const prompt = `
    Convert the following text input to AWS CDK code in TypeScript.
     
    Text: ${req.body.userInput}
    
    TypeScript CDK code: 
    
    `

    console.log(`API: ${prompt}`)
    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.3,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();
    res.status(200).json({output: basePromptOutput});
};

export default generateAction;