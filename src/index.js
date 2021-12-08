let url = "https://api.github.com/repos/SaahilMahato/leapfrog-assignment/contents"

async function getData(url) {
    const response = await fetch(url, {method: 'GET', headers:{}})
    console.log(response.json());
}

getData(url);