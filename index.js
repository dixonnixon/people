const fs = require('fs');
const Human = require('./human');

//find AVG in array of imported objects
// Human (id, first_name, ...)
// by field name
function avg(array, field) {
    let sum = 0;
    for(let v of array) {
        // console. log(v);
        if(isFinite(v[field])) {
            sum += parseFloat(v[field]);
        }
    }
    return {value: parseFloat(sum/array.length), field: field};
}

//find any peron from imported array
//by most freq fiel 

function findAnyFav(array, field) {
    let fav = findMostOne(array, field);
    // console.log(fav.value);
    let findFav = [];
    for(let v of array) 
        (v[field] == fav.value) ? findFav.push(v) : "";
    
    return findFav[Math.floor(Math.random()*findFav.length)];
}

//find most popular rows by field
function findMostOne(array, field, value) {
    var frequency = {};  // array of frequency.
    var max = 0;  // holds the max frequency.
    var result;
    var resultCn;
    var cn = 0;
    //stackOverflowCode --------------------------
    for(let v in array) {
        frequency[array[v][field]]
            = (frequency[array[v][field]] || 0) + 1; 
        if(frequency[array[v][field]] > max) { 
                max = frequency[array[v][field]];  
                result = array[v][field];          
        }

        if(value) {
            if(array[v][field] == value) {
                resultCn = array[v][field];
                cn++;
            }
            max = cn;
            
        }
    //stackOverflowCode END--------------------------
    }
    return {value: (value) ? resultCn : result, count: max, field: field};
}


//use it after data allready imported to array 
function searchData(array) {
    
    let name = findMostOne(array, 'first_name');
    let country = findMostOne(array, 'country');
    let countMen = findMostOne(array, 'gender', 'Female');
    let countWomen = findMostOne(array, 'gender', 'Male');

    let avgHeight = avg(array, 'height');
    let avgWeight = avg(array, 'weight');
    let anyFavName = findAnyFav(array, 'first_name');
    let anyFavCountry = findAnyFav(array, 'country');

    // console.log(result);
    console.log(' 1)Самое популярное имя;\n ' + name.value);
    console.log(name);
    console.log(' 2.1)Колличество мужчин;\n' + countMen.count);
    console.log(countMen);
    console.log(' 2.2)Колличество женщин;\n' + countWomen.count);
    console.log(countWomen);
    console.log(' 3)Средний рост;\n' + avgHeight.value + ' sm');
    console.log(avgHeight);
    console.log(' 4)Средний вес;\n' + avgWeight.value + ' kg');
    console.log(avgWeight);
    console.log(' 5)Название самой популярной страны;\n' + country.value);
    console.log(country);
    console.log(' 6.1)Все данные о любом человеке с самым популярным именем;\n' + anyFavName.first_name);
    console.log(anyFavName);
    console.log(' 6.2)Все данные о любом человеке из самой популярной страны;\n' + anyFavCountry.country);
    console.log(anyFavCountry);
}

function someAsyncOperation(arg, callback) {
    callback();
   
};

let search = [];
someAsyncOperation(search, () => {
    fs.readFile('./files/people.csv', (err, dt) => {
        let str = dt.toString();
        // console.log(str.length);
        let people = dt.toString().split('\r\n');
        
        let baseObj = {};
        let headers = people.shift().split(';');
        for(let head of headers) {
            baseObj[head] = '';
        }

        people.forEach((human) => {
            search.push(new Human(...human.split(';')));
        });
        // console.log(search);
        //somehow seek blank rows
        searchData(search.filter(item => item.id.length > 0));
    });
});