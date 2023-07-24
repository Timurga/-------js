const telegramPosting = require('../telegram/telegramPosting');
const { default: axios } = require('axios');

const aiTextTranslation = async (compressedArticle, image, link) => {
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

    telegramPosting(response.data.translations[0].text, image, link);
}

module.exports = aiTextTranslation;