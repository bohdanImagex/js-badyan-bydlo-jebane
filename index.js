(function (){
  const API_URL = 'https://reqres.in/api/users?';
  const totalElement = document.getElementById('total');
  const pageNumberElement = document.getElementById('page-number');
  const btnNext = document.getElementById('btn_next');
  const btnPrev = document.getElementById('btn_prev');
  const BUTTON_TYPES = {
    PREV: 'prev',
    NEXT: 'next',
  }
  const pagination = {
    page: 1,
    perPage: 2,
    totalCount: 0,
    pageNumber: 1,
  }

// Send request and work with data.
async function load() {
  const fetchURL = API_URL + new URLSearchParams({page: pagination.page, per_page: pagination.perPage,});
  const response = await fetch(fetchURL);
  const responseData = await response.json();
  const { total, data } = responseData;
  // Render total results.
  totalElement.innerHTML = `${pagination.perPage} of ${responseData.total} Records`;

  const result = document.querySelector('#result');
  // Clear result.
  result.innerHTML = ""

  // separate function for getting the HTML.
  const createUsersHTMLFromData = (usersData) => `<div class="user-info"><div class="user-first-name">${usersData.first_name}</div><div class="user-last-name">${usersData.last_name}</div><div class="user-email">${usersData.email}</div><div class="user-avatar"><img src="${usersData.avatar}"></div></div>`;

  const html = data.map(function(usersData) {
    // here we need to generate html for object.
    return createUsersHTMLFromData(usersData);
  })

  result.insertAdjacentHTML('afterbegin', html.join(''))
}

  function numPages() {
    return Math.ceil(pagination.totalCount / pagination.perPage);
  }

  // Set number of page.
  function setPageNumber(pageNumber) {
    pageNumberElement.innerHTML = pageNumber;

    // Hide Prev button if we are on the first page.
    btnPrev.style.visibility = pageNumber === 1 ? 'hidden' : 'visible';

    // Hide Next button if we are on the last page.
    btnNext.style.visibility = pageNumber === numPages() ? 'hidden' : 'visible';
  }

  function setPageLoad() {
    setPageNumber(pagination.page);
    load();
  }

  function handlePaginationButtonClick(btnType) {
    if (BUTTON_TYPES.NEXT === 'next') {
      pagination.page++;
      setPageLoad();
    }
    else if (BUTTON_TYPES.PREV === 'prev') {
      pagination.page--;
      setPageLoad();
    }
  }

// Load first result and set page number when page is loaded.
  document.addEventListener('DOMContentLoaded', function () {
    load();
    setPageNumber(pagination.page);
  })


// Get perPage value from the select.
  document.getElementById('page-size').addEventListener('change', function() {
    pagination.perPage = this.value
    load()
  });

// Click on the Next button.
  btnNext.addEventListener('click', function (event) {
    event.preventDefault();
    handlePaginationButtonClick('next')
  });

// Click on the Prev button.
  btnPrev.addEventListener('click', function (event) {
    event.preventDefault();
    handlePaginationButtonClick('prev')
  })
})()
