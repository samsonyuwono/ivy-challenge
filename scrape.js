let request = require('request');
let fs = require('fs')
let cheerio = require('cheerio');
let url = 'https://www.imdb.com/search/name?birth_monthday='
let pageNumber; //function to increment by 50 page number by 50
function getBirthDayPeople(birthMonth, birthDay){

  request(url + birthMonth + '-' + birthDay, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(html);
      let people = []
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
            director:''
          }
        };
        people.push(results)
      });
      console.log(people)
    }
  });
}
getBirthDayPeople(02, 02)
//
// request('http://www.imdb.com/title/tt0325980/?ref_=nm_knf_i1', function (error, response, html) {
//   if(!error){
//     var $ = cheerio.load(html);
//
//     $('.plot_summary_wrapper').each(function(i, element){
//       let movieRating = $(this).find('.').text();
//       let movieDirector = $(this).find('.plot_summary .inline span').text();
//       //open movie url link and scrape from there
//       console.log(movieDirector)
//     })
//   }
// });
