let request = require('request');
let fs = require('fs')
let cheerio = require('cheerio');
let url = 'https://www.imdb.com/search/name?birth_monthday=02-02'

request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    let $ = cheerio.load(html);

    $('.lister-item.mode-detail').map(function(i, element){
      let actorName = $(this).find('h3 a').text().trim()
      let photoURL = $(this).find('img').attr('src')
      let profileURL = $(this).find('a').attr('href');
      let movieTitle = $(this).find('.text-muted.text-small a').text().trim()
      let movieURL = $(this).find('.text-muted.text-small a').attr('href');

      console.log(movieURL)
        let people = {
          name: actorName,
          photoUrl: photoURL,
          profileURL: profileURL,
          mostKnownWork: {
            title: movieTitle,
            url: movieURL,
            rating: 0,
            director:''
          }
        };
        console.log(people)
    });
  }
});
