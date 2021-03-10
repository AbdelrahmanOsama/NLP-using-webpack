const handleSubmit = event =>{
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    
    if (Client.validateURL(formText)) {
        document.getElementById('spinner').style.display = 'block';
        fetch('http://localhost:8081/api', {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: formText})
        })
        .then(res => res.json())
        .then(function(res) {
            console.log(res);
            document.getElementById('polarity').innerHTML = 'Polarity: '+polarityChecker(res.score_tag);
            document.getElementById("agreement").innerHTML = `Agree or Disagree: ${res.agreement}`;
            document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
            document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
            document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
            document.getElementById('spinner').style.display = 'none';
        }).catch(function() {
            document.getElementById('spinner').style.display = 'none';
            alert('Something wrong happened, please try again');
        })
    }else{
        alert('Please try with a valid URL!');
    }

}

const polarityChecker = (score) => {
    let display;
    switch (score){
        case 'P+':
            display = 'Strongly Positive';
            break;
        case 'P':
            display = 'Positive';
            break;
        case 'NEW':
            display = 'Neutral';
            break;
        case 'N':
            display = 'Negative';
            break;
        case 'N+':
            display = 'Strongly Negative';
            break;
        case 'NONE':
            display = 'Without Sentiment';
    }
    return display;
}



export { handleSubmit,polarityChecker }
