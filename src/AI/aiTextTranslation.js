const { Configuration, OpenAIApi } = require('openai');
const telegramPosting = require('../telegram/telegramPosting');
const { default: axios } = require('axios');

const aiTextTranslation = async (compressedArticle, image, link) => {
    // const configuration = new Configuration({
    //     apiKey: process.env.OPENAI_API_KEY,
    // });

    // const openai = new OpenAIApi(configuration);

    // const completion = await openai.createChatCompletion({
    //     model: 'gpt-3.5-turbo-0613',
    //     messages: [{
    //         'role': "system",
    //         'content': `Translate the provided text into Russian. 
    //         Answer in the format 
    //         Title: 
    //         Article Text:
    //         But it is not allowed to leave Title and Article Text inscriptions in the text
    //         This is necessary for further data transfer in JSON format`
    //     },
    //     {
    //         "role": "user",
    //         "content": `${compressedArticle.content}`
    //     }]
    // });

    // await telegramPosting(completion.data.choices[0].message.content, image);
    const target_lang = 'ru';

    const body = {
        'targetLanguageCode': target_lang,
        'texts': compressedArticle.content,
        'folderId': process.env.FOLDER_ID
    }

    const response = await axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate', JSON.stringify(body), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.IAM_TOKEN}`
            }
        }
    );

    // console.log(response.data.translations[0].text);
    telegramPosting(response.data.translations[0].text, image, link);
}

module.exports = aiTextTranslation;