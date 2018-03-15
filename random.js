let getData = function(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()
        xhr.onload = function() {
            if(xhr.status == 200) {
                resolve(JSON.parse(xhr.response))
            } else {
                reject(xhr.responseText)
            }
        }
        xhr.onerror = function() {
            reject(Error('Network Error'))
        }
    })
}

getData("http://jservice.io/api/categories?count=5&offset=10")
.then(res => {
    for (const object of res) {
        var categoryDiv = document.createElement('div')
        categoryDiv.classList.add("category")
        var gridCategories = document.querySelector('.grid-categories')
        gridCategories.appendChild(categoryDiv)
        categoryDiv.innerHTML = object["title"]

        getData("http://jservice.io/api/category?id=" + object["id"])
        .then(res => {
            var counter = 0;
            for(const object of res["clues"]) {
                if(counter != 5) {
                    newFunction(object)
                    counter++;
                }   
                
            }
        })
    }
})

let newFunction = function(object) {
    var answerDiv = document.createElement('div')
    answerDiv.classList.add("answer")
    var gridAnswers = document.querySelector('.grid-answers')
    gridAnswers.appendChild(answerDiv)    
    answerDiv.innerHTML = object["value"]
    
    answerDiv.addEventListener("click", function() {
        answerDiv.innerHTML = object["question"]
    })
}




