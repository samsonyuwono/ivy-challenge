let request = require('request');
let rp = require('request-promise');
let fs = require('fs')
let cheerio = require('cheerio');
let url = 'https://www.imdb.com/search/name?birth_monthday='
let people = []
let out = {}
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
        // console.log(people)
      });
      people.forEach(function(element){
        // console.log(element)
        let movieInfo = []
        let movieURLInfo= element.mostKnownWork.url
        // console.log(element)
        request(movieURLInfo, function (error, response, html) {
          if(!error && response.statusCode == 200){
            var $ = cheerio.load(html);
            $('#title-overview-widget').each(function(i, element){
              let movieRating = $(this).find('.imdbRating').children().children().first().text();
              let movieDirector = $(this).find('.credit_summary_item').children().first().next().text().trim().replace(/,/g, '');

              let movieResults = {
                rating: movieRating,
                director: movieDirector
              }
              movieInfo.push(movieResults)
            })
            console.log(movieInfo) //works here
          }
          // let mostKnownWork = element.mostKnownWork
          // console.log(movieInfo.movieRating)
          // let mega = people.concat(movieInfo)
          // console.log(movieURLInfo)
          movieInfo.forEach(function(element){
            if(element.rating === movieURLInfo){
              people.push(element.rating)
            }
            // console.log(element)
          })
          // console.log(movieInfo) //works here
          // console.log(element)
        });
        // console.log(element)
        // console.log(mostKnownWork)
        // console.log(movieInfo)
        // console.log(element.mostKnownWork)
      })
    }
  })
}
//people = getBirthDayPeople

getBirthDayPeople(02, 02, 1)
