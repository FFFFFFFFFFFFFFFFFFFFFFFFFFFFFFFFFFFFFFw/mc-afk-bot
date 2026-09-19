const mineflayer = require('mineflayer');

// Настройки подключения
const botOptions = {
  host: 'gf-1.apexnodes.xyz', // Ваш адрес сервера (БЕЗ порта)
  port: 58224,                // Ваш ТЕКУЩИЙ порт сервера
  username: 'AFK_Bot',        // Ник бота в игре
  version: false              // Автоматическое определение версии
};

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Бот успешно зашел на сервер!');
  });

  // Анти-кик: бот будет прыгать каждые 30 секунд
  setInterval(() => {
    if (bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }
  }, 30000);

  // Авто-переподключение при вылете сервера
  bot.on('end', () => {
    console.log('Отключение от сервера. Переподключение через 10 секунд...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Ошибка:', err));
}

// Запуск веб-сервера для поддержки активности хостинга
const http = require('http');
http.createServer((req, res) => {
  res.write("Бот работает!");
  res.end();
}).listen(8080);

createBot();
