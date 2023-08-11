const mongoose = require('mongoose');
const { Telegram } = require('telegraf');
const postSchema = require('../schema/PostSchema');

const telegramPosting = async (message, image, link) => {
    const telegram = new Telegram(process.env.TELEGRAM_BOT_API);

    const postModel = await mongoose.model('PostItems', postSchema);

    const text = `
    ${message}
                    <a href="${image}">ㅤ</a>
<a href="${link}">Источник</a>
    `

    await telegram.sendMessage('@news3dtest', text, {parse_mode: 'HTML'})
        .then(msg => {
            console.log('Сообщение отправлено');
            console.log(msg);
        })
        .catch(e => {
            console.log(e);
        });

    await postModel.create({ url: link });
    
}
module.exports = telegramPosting;