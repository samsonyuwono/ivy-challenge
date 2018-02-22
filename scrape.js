let request = require('request');
let rp = require('request-promise');
let fs = require('fs')
let cheerio = require('cheerio');
let url = 'https://www.imdb.com/search/name?birth_monthday='
let pageNumber; //function to increment by 50 page number by 50
let people = []
let movieInfo = []
//out = { people: people }
//get people array out of it
//make another function that loops through for each person's url
//after get birthday people run console.log(people)
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
      people.forEach(function(element){
        let movieURLInfo= element.mostKnownWork.url
        // console.log(element)
        request(movieURLInfo, function (error, response, html) {
          if(!error && response.statusCode == 200){
            var $ = cheerio.load(html);
            $('#title-overview-widget').each(function(i, element){
              let movieRating = $(this).find('.imdbRating').children().children().first().text();
              let movieDirector = $(this).find('.credit_summary_item').children().first().next().text().trim().replace(/,/g, '');
              //open movie url link and scrape from there
              let movieResults = {
                rating: movieRating,
                director: movieDirector
              }
              movieInfo.push(movieResults)
            })
          }
        });
          console.log(movieInfo)
      })
    }
  })
}
//people = getBirthDayPeople
getBirthDayPeople(02, 02)
