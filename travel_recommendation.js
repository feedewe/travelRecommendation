
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
        let recommendation = null;

        for(const country of data.countries){
            for(const city of country.cities){
                if(city.name.toLowerCase()===input){
                    recommendation=city;
                    break;
                }
            }
            if(recommendation) break;
        }
        
        if(!recommendation){
            recommendation = data.beaches.find(item=>item.name.toLowerCase()===input);
        }if(!recommendation){
            recommendation = data.temples.find(item=>item.name.toLowerCase()===input);
        }if(recommendation){
            resultDiv.innerHTML += `<h2>${recommendation.name}</h2>`;
            resultDiv.innerHTML += `<img src="${recommendation.imageUrl}" alt="${recommendation.name}" width="300">`;
            resultDiv.innerHTML += `<p><strong>Description:</strong> ${recommendation.description}</p>`;
        }else{
            resultDiv.innerHTML = 'Recommendation not found.';
        }
    })
    .catch(error => {
        console.error('Error: ',error);
        resultDiv.innerHTML = 'An error ocurred while fetching data.';
    });
}
btnSearch.addEventListener('click',search);
