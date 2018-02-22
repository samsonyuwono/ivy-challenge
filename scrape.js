let request = require('request');
let rp = require('request-promise');
let fs = require('fs')
let cheerio = require('cheerio');
let url = 'https://www.imdb.com/search/name?birth_monthday='
let pageNumber; //function to increment by 50 page number by 50
let people = []
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
        // let movieRating = $(this).find('.star-box-giga-star').text();
        // let movieDirector = $(this).find('.credit_summary_item .inline').text();
        //open movie url link and scrape from there
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
  let movieURL2= element.mostKnownWork.url

  request(movieURL2, function (error, response, html) {
    if(!error && response.statusCode == 200){
      var $ = cheerio.load(html);

      $('#title-overview-widget').each(function(i, element){
        let movieRating = $(this).find('.imdbRating').children().children().first().text();
        let movieDirector = $(this).find('.credit_summary_item').children().first().next().text().trim();
        console.log(movieRating)
        //open movie url link and scrape from there
      })
    }
  });
  // console.log(movieURL2)
})

      // console.log(people)
    }
  })
}
//people = getBirthDayPeople
getBirthDayPeople(02, 02)

// function getMovieInfo(){
//
//   request('http://www.imdb.com/title/tt0089243/', function (error, response, html) {
//     if(!error){
//       var $ = cheerio.load(html);
//
//       $('#title-overview-widget').each(function(i, element){
//         // console.log(this)
//         let movieDirector = $(this).find('.credit_summary_item').children().first().next().text().trim();
//         let movieRating = $(this).find('.imdbRating').children().children().first().text();
//         console.log(movieRating)
//         //open movie url link and scrape from there
//       })
//     }
//   });
// }
//
// getMovieInfo()
