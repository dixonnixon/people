const fs = require('fs');
const Human = require('./human');

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

function findFav(array, field) {
    let fav = find(array, field);
    console.log(fav.value);
    let findFav = [];
    for(let v of array) 
        (v[field] == fav.value) ? findFav.push(v) : "";
    
    return findFav[Math.floor(Math.random()*findFav.length)];
}

function find(array, field, value) {
    var frequency = {};  // array of frequency.
    var max = 0;  // holds the max frequency.
    var result;
    var resultCn;
    var cn = 0;
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
    }
    return {value: (value) ? resultCn : result, count: max, field: field};
}

function searchData(array) {
    // console.log(array);
    // console.log(mode);
    // console.log(array);
    
    let name = find(array, 'first_name');
    let country = find(array, 'country');
    let countMen = find(array, 'gender', 'Female');
    let countWomen = find(array, 'gender', 'Male');

    let avgHeight = avg(array, 'height');
    let avgWeight = avg(array, 'weight');
    let anyFavName = findFav(array, 'first_name');
    let anyFavCountry = findFav(array, 'country');

    // console.log(result);
    console.log(name);
    console.log(country);
    console.log(countMen);
    console.log(countWomen);
    console.log(avgHeight);
    console.log(avgWeight);
    console.log(anyFavName);
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
        searchData(search.filter(word => word.id.length > 0));
    });
});