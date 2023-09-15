const input = document.getElementById('search');
input.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const apiElements = document.querySelectorAll('.card');
    apiElements.forEach(api => {
        const apiTitle = api.querySelector('.title').textContent.toLowerCase();
        const isVisible = apiTitle.includes(value);
        api.style.display = isVisible ? 'block' : 'none';
    });
});

async function getAPIData() {
   const resp = await fetch('https://api.publicapis.org/entries');
   const apiData = await resp.json();
   displayData(apiData)
   apiArray = apiData.entries
}

function initialsFilter(button) {
    allBtns = document.querySelectorAll('button')
    allBtns.forEach(btn => {
        btn.style.color = "#fafafa";
    });
    const apiElements = document.querySelectorAll('.card');
    const value = button.getAttribute('value');
    button.style = "color: rgb(210, 152, 27)"
    apiElements.forEach(api => {
        const apiTitle = api.querySelector('.title').textContent.toUpperCase();
        const inital = apiTitle[0]
        const isVisible = value === inital;
        api.style.display = isVisible ? 'block' : 'none';
    });
}

function displayData(data) {
    allBtns = document.querySelectorAll('button')
    allBtns.forEach(btn => {
        btn.style.color = "#fafafa";
    });
    let container = document.getElementById('container')
    const entries = data.entries
    sortedData = entries.sort(function (a, b) {
        if (a.API.toLowerCase() < b.API.toLowerCase()) {
          return -1;
        }
        if (a.API.toLowerCase() > b.API.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    container.innerHTML = ''
    for (let index = 0; index < sortedData.length; index++) {
        const element = sortedData[index];
        const cardContainer = document.createElement('div') 
        cardContainer.className = 'card'
        const titleContainer = document.createElement('h4')
        titleContainer.className = 'title'
        const link = document.createElement('a')
        link.setAttribute('href', element.Link) 
        link.setAttribute('target', '_blank')
        const descriptionContainer = document.createElement('span')
        descriptionContainer.className = 'description'
        const title = document.createTextNode(element.API)
        const description = document.createTextNode(element.Description)
        titleContainer.appendChild(title)
        descriptionContainer.appendChild(description)
        link.appendChild(titleContainer)
        cardContainer.appendChild(link)
        cardContainer.appendChild(descriptionContainer)
        container.appendChild(cardContainer)       
    }
}

getAPIData()