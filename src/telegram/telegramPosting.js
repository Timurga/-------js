const { Telegram } = require('telegraf');

const telegramPosting = async (message, image, link) => {
    const telegram = new Telegram(process.env.TELEGRAM_BOT_API);

    const text = 
    `
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
    
}
module.exports = telegramPosting;