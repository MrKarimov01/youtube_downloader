const TelegramBot = require('node-telegram-bot-api');

const TOKEN = "5587070710:AAGqKe3seUUMz0qnxbFpTGud7Ml48RChWV8";

const bot = new TelegramBot(TOKEN, { polling: true })
const fs = require('fs');
const ytdl = require('ytdl-core');
const { log } = require('console');


// ytdl('https://www.youtube.com/watch?v=jOzvS4Bx-yw')
//   .pipe(fs.createWriteStream('video.mp4'));

bot.on("message", async(message) => {
    const chatId = message.chat.id;
    const chatname = message.chat.first_name;
    if (message.text == "/start") {
        bot.sendMessage(chatId, `
     ${`Assalomu alaykum👋  <b>${chatname}</b>
    
Men <b>Ro'zimuhammadDev</b> tomonidan yozilgan youtube downlonder botman va men youtubedan videolar yuklab beraman 
    
Mening otam: https://t.me/RozimuhammadDev`}`, {
            parse_mode: "HTML"
        })
      

    }
    else{
        if(ytdl.validateURL(message.text) == true){
           async function botSendVideo(){
            let info = await ytdl.getBasicInfo(message.text)
            let vidname = info.videoDetails.title
            console.log(vidname)
                try {
                    ytdl(message.text)
                    .pipe(fs.createWriteStream(`${vidname}.mp4`))
                    setTimeout(async()=>{
                        await bot.sendVideo(chatId, `${vidname}.mp4`,{
                            caption: vidname + `Telegram: https://t.me/RozimuhammadDev`
                        })
                    },10000)
                } catch (error) {
                    console.log(error + "");
                }

           }
           botSendVideo()
        }
        else {
            bot.sendMessage(chatId, "Hozircha faqat youtubedan video yuklayman🙃")
        }
    }

})
console.log("zor");