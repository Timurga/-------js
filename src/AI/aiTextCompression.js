const { Configuration, OpenAIApi } = require('openai');
const aiTextTranslation = require('./aiTextTranslation');

const aiTextCompression = async (article, link) => { 
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });

    const openai = new OpenAIApi(configuration);

    if (article === null) {
        return;
    } else {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-0613',
            temperature: 0.2,
            messages: [{
                'role': "system",
                'content': `Transform and condense an article about 3D printing and materials into a concise version of no more than 1000 letters, and if this is not possible, then make a short extract from the provided text, but it must necessarily be less than 1000 letters, also break the text into paragraphs. The article title should be no more than 50 characters. Your version should retain the key informational elements, simplify complex terms, and maintain the original structure and language of the article. However, you should strive to make your version appealing, accurate to a wide audience, and creative. 

                Please provide the condensed article in the following format, without the words "Title" and "Article Text":
                Headline (wrap around the headline like this: <b> Title </b>)
                *empty space*
                Article text
                
                This format is required for later JSON parsing.`
            },
                {
                "role": "user",
                "content": `Title: ${article.newsTitle} Text of the article: ${article.articleText}`
            }]
        });

        await aiTextTranslation(completion.data.choices[0].message, article.imageUrl, link);
    }
}

module.exports = aiTextCompression;