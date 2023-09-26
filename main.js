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
        btn.style.color = "#f4e4b2c5";
    });
    const apiElements = document.querySelectorAll('.card');
    const value = button.getAttribute('value');
    button.style = "color: #DDB967"
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
        btn.style.color = "#F4E3B2";
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
        if (element.Auth === '') {
            element.Auth = 'None';
        }

        // Create a link element
        const link = document.createElement('a');
        link.setAttribute('href', element.Link);
        link.setAttribute('target', '_blank');

        // Create card container
        const cardContainer = document.createElement('a'); // Wrap the card in an anchor element
        cardContainer.className = 'card';
        cardContainer.setAttribute('href', element.Link); // Set the href attribute of the card
        cardContainer.setAttribute('target', '_blank')

        // Create title element
        const titleContainer = document.createElement('h2');
        titleContainer.className = 'title';
        const title = document.createTextNode(element.API);
        titleContainer.appendChild(title);

        // Create description element
        const descriptionContainer = document.createElement('span');
        descriptionContainer.className = 'description';
        const description = document.createTextNode(element.Description);
        descriptionContainer.appendChild(description);

        // Create info element
        const infoContainer = document.createElement('div');
        infoContainer.className = 'info';
        const auth = document.createTextNode('Authorization: ' + element.Auth);
        infoContainer.appendChild(auth);

        // Append title, description, and info to the card container (now an <a> element)
        cardContainer.appendChild(titleContainer);
        cardContainer.appendChild(descriptionContainer);
        cardContainer.appendChild(infoContainer);

        // Append the card container (an <a> element) to the container
        container.appendChild(cardContainer);     
    }
}

getAPIData()