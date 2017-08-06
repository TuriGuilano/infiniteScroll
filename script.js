// Select the container which will display our data
const ul = document.querySelector('ul'),
      // The amount of offset px before data fetch starts
      loadTrigger = 100;
// Current page gets updated everytime we do a API call
let currentPage = 0,
    isLoading = false;

// Events
ul.addEventListener('scroll', () => {
  if(ul.scrollHeight <= ul.scrollTop + ul.clientHeight + loadTrigger) {
    getData(currentPage);
  }
});

// Functions
const getData = (page) => {
  if(!isLoading) {
    isLoading = true;
    // Set max per API call, 5 per page
    fetch(`http://jsonplaceholder.typicode.com/posts?_start=${page}&_limit=5`)
      .then(res => res.json())
      .then(res => {
        isLoading = false;
        currentPage++;
        addListItems(res);
      });
  }
}

getData(currentPage);

const addListItems = (dataArray) => {
  dataArray.map(dataObject => {
    ul.innerHTML += `
      <li>
        <h2>${dataObject.title}</h2>
        <p>${dataObject.body}</p>
      </li>
    `;
  });
}
