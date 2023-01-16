import { Configuration, OpenAIApi } from "openai";

const configuration =  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});



const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
    const prompt = `
    Write code in ${req.body.language} for the AWS CDK in response to the following text.
     
    Text: ${req.body.userInput}
    
    ${req.body.language} CDK code: 
    
    `

    console.log(`API: ${prompt}`)
    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.1,
        max_tokens: 500,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();
    res.status(200).json({output: basePromptOutput});
};

export default generateAction;