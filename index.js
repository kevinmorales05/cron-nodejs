
import fetch from 'node-fetch';
import NodeCache from 'node-cache';
import express, { response } from 'express';
import cron from 'node-cron';
import moment from 'moment'


const myCache = new NodeCache({ stdTTL: 10 });

const app = express();
const port = 3001;

const todosUrl ="https://pokeapi.co/api/v2/pokemon/ditto";

//Cache implementation
app.get("/todos", (req, res) => {
    if( myCache.has("todos")) {
        console.log("Getting from the cache");
        return res.send(myCache.get("todos"));
    }
    else {
        fetch(todosUrl)
        .then((response) => response.json())
        .then((json)=> {
            myCache.set("todos", json);
            console.log("Getting from API");
            res.send(json);
        } )
    }
});
//Cron implementation for each minute
cron.schedule(' */1 * * * *', () => {
   let currentTime = moment().format('hh:mm:ss')
    console.log("Este es el CRON minute", currentTime)
 });
//Cron implementation for each 10 seconds
cron.schedule(' */10 * * * * *', () => {
    let currentTime = moment().format('hh:mm:ss')
     console.log("Este es el CRON each 10 seconds", currentTime)
  });
//Cron cada hora especifica
cron.schedule(' 2 13 * * * *', () => {
    let currentTime = moment().format('hh:mm:ss')
     console.log("Este es el CRON minute specific ", currentTime)
  });
//Cron a las 23:00
cron.schedule(' 0 0 23 * * *', () => {
    let currentTime = moment().format('hh:mm:ss')
     console.log("Este es el CRON 23 horas ", currentTime)

let arrayCollection = ['other_products', 'PR', 'DR', 'UA']

for(i=0; i<arrayCollection; i++) {
    let collection = arrayCollection[i]
    fetch(`www.hola.com/api/${collection}`).then(
        reponse => {
            response.json ()
        }
    ).then(
        response => {
            myCache.set(collection,response)
        }
    )

}


  });
//Cron specific hour 11:55
// cron.schedule('* * * * * *', () => {
//     let currentTime = moment().format('hh:mm:ss')
//      console.log("Este es el CRON 23 horas ", currentTime)
//   });
//Cron specific hour 11:25:02
cron.schedule(' 22 19 12 * * *', () => {
    let currentTime = moment().format('hh:mm:ss')
     console.log("Este es el CRON 23 horas ", currentTime)
  });
//Cron specific hour 11:25:02
cron.schedule(' 23 05 13 * * *', () => {
    let currentTime = moment().format('hh:mm:ss')
     console.log("Este es el CRON 23 horas ", currentTime)
  });


//Get stats of the cache
app.get("/stats", (req, res) => {
    res.send(myCache.getStats())
})



app.listen(port, () => {
    console.log(`Example server is running at port ${port}`)
})