
const btnSearch = document.getElementById('btnSearch');
const result = [];

function resetSearch(){
    document.getElementById('conditionInput').value ="";
}

function resetForm(){
    document.getElementById("name").value = "";
    document.getElementById("email").value="";
    document.getElementById("message").value="";
}

function search(){
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML='';


    fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data=> {
        let found = false;

        for(const country of data.countries){
            for(const city of country.cities){
                if(city.name.toLowerCase().includes(input)){
                    resultDiv.innerHTML += `<h2>${city.name}</h2>`;
                    resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}" width="300">`;
                    resultDiv.innerHTML += `<p><strong>Description:</strong> ${city.description}</p>`;
                    found = true;
                }
            }
        }
        
        for(const temple of data.temples){
            if(temple.name.toLowerCase().includes(input) || input.includes("temple")){
                resultDiv.innerHTML += `<h2>${temple.name}</h2>`;
                resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="${temple.name}" width="300">`;
                resultDiv.innerHTML += `<p><strong>Description:</strong> ${temple.description}</p>`;
                found = true;
                }
            }
        
        for(const beach of data.beaches){
            if(beach.name.toLowerCase().includes(input) || input.includes("beach")){
                resultDiv.innerHTML += `<h2>${beach.name}</h2>`;
                resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="${beach.name}" width="300">`;
                resultDiv.innerHTML += `<p><strong>Description:</strong> ${beach.description}</p>`;
                found = true;
            }
        } 
        if(!found){
            resultDiv.innerHTML = 'Recommendation not found.';
        }
    })
    .catch(error => {
        console.error('Error: ',error);
        resultDiv.innerHTML = 'An error ocurred while fetching data.';
    });
}
btnSearch.addEventListener('click',search);
btnReset.addEventListener('click',resetSearch);
