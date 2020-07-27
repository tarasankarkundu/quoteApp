(function(){
    const container = document.getElementById('container');
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const twitterBtn = document.getElementById('tweet');
    const NextBtn = document.getElementById('next');
    const loader = document.getElementById('loader');
    let quote = '';
    let author = '';
    const showLoader = () => {
        loader.style.display = 'block';
        container.style.display = 'none';
    }
    const hideLoader = () => {
        loader.style.display = 'none';
        container.style.display = 'block';
    }
    const getQuote = async() =>{
        showLoader();
        const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
        const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        try {
            const response = await fetch(proxyUrl + apiUrl);
            const data = await response.json();
            hideLoader();
            quote = data.quoteText;           
            author = (data.quoteAuthor === '') ? 'Unknown' : data.quoteAuthor;
            console.log(quote, author);
            quoteElement.innerText = quote;
            authorElement.innerText = `- ${author}`;
        } catch (error){
            getQuote();
        }
    }   

    

    twitterBtn.addEventListener('click', ()=>{
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
        window.open(twitterUrl, '_blank');
    })
    NextBtn.addEventListener('click', getQuote);

    getQuote();

})()