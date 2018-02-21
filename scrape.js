let request = require('request');
let fs = require('fs')
let cheerio = require('cheerio');
let url = 'https://www.imdb.com/search/name?birth_monthday=02-02'

request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    let $ = cheerio.load(html);
    ignoreWhitespace: false
    $('.lister-item.mode-detail').map(function(i, element){
      let actorName = $(this).find('h3').text();
      let photoURL = $(this).find('img').attr('src')
      let profileURL = $(this).find('a').attr('href');
      let works = $('p.text-muted.text-small a').text()

      console.log(profileURL)
        let people = {
          name: 'Gemma Arterton',
          photoUrl: photoURL,
          profileURL: profileURL,
          mostKnownWork: {
            title: works,
            url: 'Prince of Persia: The Sands of Time',
            rating: 6.6,
            director: ""
          }
        };
            // console.log(people)
    });
  }
});
