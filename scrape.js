let request = require('request');
let cheerio = require('cheerio');

request('https://www.imdb.com/search/name?birth_monthday=02-02', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('.lister-item.mode-detail').each(function(i, element){
      var actorName = $('.lister-item-header a').text();
      console.log(actorName);
    });
  }
});
