(function() {
    var xhttp = new XMLHttpRequest();

    var promise = new Promise(function(ok, error) {
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               var response = xhttp.responseText;
               var obj = JSON.parse(response);
               ok(obj);
            }
        };
        xhttp.open("GET", "https://swapi.co/api/films/", true);
        xhttp.send();
    });
    promise.then(function(data) {
        //alert("Data ok");
        
        if(fillData(data) == false) {
            showMovie(data);
        }
    }).catch(function() {
        alert("fail data");
    }); 
})();

function fillData(data) {
    var table = document.querySelector(".table");
    var c = new Array();
    
    if(!table) {
        return false;
    }

    for(var i = 0; i < data.results.length; i++) {
        var a = table.insertRow(1 + i);
        a.insertCell(0).innerText = data.results[i].planets.length;
        a.insertCell(0).innerText = data.results[i].characters.length;
        a.insertCell(0).innerText = data.results[i].director;
        a.insertCell(0).innerHTML = "<a href='view.html?" + i + "'>" + data.results[i].title + "</a>";
        c.push(data.results[i].release_date);
        c.sort();
    }

    for(var i = 0; i < c.length; i++) {
        var a = table.rows[i +1];
        a.insertCell(1).innerText = c[i];
    }
}

function showMovie(data) {
    var url = document.URL;
    var item = url.substr(url.length - 1, url.length);
    var title = document.querySelector(".title");
    var legend = document.querySelector(".legend");
    title.innerText = data.results[item].title;
    legend.innerText = data.results[item].opening_crawl;

    
    var charactersA = new Array(); 
    
    /*for(var i = 0; i < data.results[item].characters.length; i++) {
        var a = requestUrl(data.results[item].characters[i]);
        charactersA.push(a);
        console.log(charactersA[i]);
    }*/

    document.body.style.display = "block";
}

function requestUrl(url) {
    var xhttp = new XMLHttpRequest();
    
    var promise = new Promise(function(ok, error) {
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = xhttp.responseText;
                var obj = JSON.parse(response);
                ok(obj);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    });
    promise.then(function(data) {
        return data;
    }).catch(function() {
        alert("fail data two");
    });
}
