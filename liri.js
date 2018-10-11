// To install npm for dotenv, npm install dotenv
// Configure dotenv
require("dotenv").config();

// Soptify set up To be update
// var Spotify = require('node-spotify-api');
// var keys = require("./keys.js")
// var spotify = new Spotify(keys.spotify)
//console.log(spotify)

// Load the fs package to read and write
var fs = require("fs");

// Include the request npm package  
var request = require("request");
var input1 = process.argv[2];
var input2 = process.argv.slice(3).join(" ");


// If no song is provided then your program will default to "The Sign" by Ace of Base.

// artists Rihanna
var concerturl = "https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp"
var movieurl = "http://www.omdbapi.com/?t=" + input2 + "&apikey=trilogy"


// Read file for action random.txt
function readfile() {
    // We will read the existing random.text
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
      else {
        // Break down all the numbers inside
        data = data.split(", ");
        input1 = data[0]
        input2 = data[1]
        console.log(input1)
        console.log(input2)
      }
    })
}

// Actions
switch (process.argv[2]){
    case 'concert-this':
        // Then run a request to the bandsintown api result
        request(concerturl, function(error, response, body) {
            if (error){
            console.log(error)
            }
            else{
                if ( (JSON.parse(body).length) > 0 ) {                   
                    console.log("\n");
                    for (let i = 0; i < (JSON.parse(body).length); i++){
                        console.log("Search Result " + (i+1));
                        console.log("Artist/band name: " + input2)
                        console.log("Name of the venue: " + JSON.parse(body)[i].venue.name)
                        console.log("Venue location: " + JSON.parse(body)[i].venue.city + ', ' + JSON.parse(body)[i].venue.country)                
                        console.log("Date of the Event: " + JSON.parse(body)[i].datetime)
                        console.log("-------------------------------------\n")
                    }
                }
                else {
                    console.log('No search result for ' + input2)
                }
            }
        });     
    break
    case 'spotify-this-song':      
        //Then run a request to get spotify api result
        spotify
        .search({ type: 'track', query: 'All the Small Things' })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        });
                // console.log (JSON.parse(body))
                // console.log ("Artist(s): ")
                // console.log ("The song's name: " + JSON.parse(body).Title)
                // console.log ("A preview link of the song from Spotify: " + JSON.parse(body).venue)
                // console.log ("The album that the song is from: " + JSON.parse(body).venue) 
                // console.log("-------------------------------------\n")
    break
    case 'movie-this':
        // Then run a request to the OMDB API with the movie specified
        request(movieurl, function(error, response, body) {
            if (error){
            console.log(error)
            }
            else{
                console.log("Title of the movie: " + JSON.parse(body).Title)
                console.log("Year: " + JSON.parse(body).Year)
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
                console.log("Country produced: " + JSON.parse(body).imdbRating )
                console.log("Language: " + JSON.parse(body).Language)
                console.log("Plot: " + JSON.parse(body).Country)
                console.log("Actors: " + JSON.parse(body).Actors)
                console.log("-------------------------------------\n")
            }
        });     
    break
    case 'do-what-it-says':
         readfile(); 
    break
    default:
    console.log('error happend')
}






