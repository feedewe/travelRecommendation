
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

    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data=> {
        const recommendation = data.recommendations.find(item=>item.name.toLowerCase()===input);

        if(recommendation){
            const destiny = recommendation.name.join(', ');
            const description = recommendation.description.join(', ');
            const image = recommendation.imageUrl;

            resultDiv.innerHTML += `<h2>${destiny}</h2>`;
            resultDiv.innerHTML += `<img src="${image}" alt="hjh">`;
            resultDiv.innerHTML += `<p><strong>Description:</strong> ${description}</p>`;
        }
        else{
            resultDiv.innerHTML = 'Recommendation not found.';
        }
    })
    .catch(error => {
        console.error('Error: ',error);
        resultDiv.innerHTML = 'An error ocurred while fetching data.';
    });
}
btnSearch.addEventListener('click',search);
