let request = require('request');
let rp = require('request-promise');
let fs = require('fs')
let cheerio = require('cheerio');
let url = 'https://www.imdb.com/search/name?birth_monthday='
let people = []


function getBirthDayPeople(birthMonth, birthDay, positionStart){
  request(url + birthMonth + '-' + birthDay + '&start=' + positionStart, function (error, response, html) {
    if (!error && response.statusCode == 200) {

      let $ = cheerio.load(html);
      let imdb = 'http://www.imdb.com'
      $('.lister-item.mode-detail').each(function(i, element){
        let actorName = $(this).find('h3 a').text().trim()
        let photoURL = $(this).find('img').attr('src')
        let profileURL = imdb + $(this).find('a').attr('href');
        let movieTitle = $(this).find('.text-muted.text-small a').text().trim()
        let movieURL = imdb + $(this).find('.text-muted.text-small a').attr('href');

        let results = {
          name: actorName,
          photoUrl: photoURL,
          profileURL: profileURL,
          mostKnownWork: {
            title: movieTitle,
            url: movieURL,
            rating: 0,
            director: ''
          }
        };
        people.push(results)
      });
      people.forEach(function(element, i){
        let movieInfo = []
        let movieURLInfo= element.mostKnownWork.url
        let newMovieRating = element.mostKnownWork.rating
        request(movieURLInfo, function (error, response, html) {
          if(!error && response.statusCode == 200){
            var $ = cheerio.load(html);
            $('#title-overview-widget').each(function(i, element){
              let movieRating = $(this).find('.imdbRating').children().children().children().text();
              let movieDirector = $(this).find('.credit_summary_item').children().first().next().text().trim().replace(/,/g, '');

              let movieResults = {
                rating: movieRating,
                director: movieDirector
              }
              
              movieInfo.push(movieResults)
            })
            element["mostKnownWork"]["rating"] = movieInfo[0]["rating"]
            element["mostKnownWork"]["director"] = movieInfo[0]["director"]
          }
          console.log(element)
        });
      })
    }
  })
}

getBirthDayPeople(03, 26, 1)
