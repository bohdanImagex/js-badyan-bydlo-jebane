(function (){
  const API_URL = 'https://reqres.in/api/users?';
  const totalElement = document.getElementById('total');
  const pageNumberElement = document.getElementById('page-number');
  const urlParams = new URLSearchParams(window.location.search);
  const btnNext = document.getElementById('btn_next');
  const btnPrev = document.getElementById('btn_prev');
  const BUTTON_TYPES = {
    PREV: 'prev',
    NEXT: 'next',
  }
  const pagination = {
    page: 1,
    perPage: 2,
    totalCount: 12,
    pageNumber: 1,
  }
  let currentPage = urlParams.get('current_page') ?? pagination.page;
  let perPage = urlParams.get('per_page') ?? pagination.perPage;

// Send request and work with data.
  async function load() {
    const fetchURL = API_URL + new URLSearchParams({page: currentPage, per_page: perPage});
    const response = await fetch(fetchURL);
    const responseData = await response.json();
    const { total, data } = responseData;
    pagination.totalCount = total;
    // Render total results.
    totalElement.innerHTML = buildTotalElement(perPage, currentPage, responseData.total);

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

  // Build result text for the pagination.
  function buildTotalElement(perPage, currentPage, total) {
    if (currentPage === 1) {
      return `1 - ${perPage} of ${total} Records`;
    }
    else {
      let secondElement = perPage * currentPage;
      let firstElement = secondElement - perPage;
      return `${firstElement} - ${secondElement} of ${total} Records`;
    }
  }

  function numPages() {
    return Math.ceil(pagination.totalCount / perPage);
  }

  // Set number of page.
  function setPageNumber(pageNumber) {
    pageNumberElement.innerHTML = pageNumber;

    // Hide Prev button if we are on the first page.
    btnPrev.style.visibility = pageNumber == 1 ? 'hidden' : 'visible';

    btnNext.style.visibility = pageNumber == numPages() ? 'hidden' : 'visible';
  }

  function setPageLoad() {
    load();
    setPageNumber(currentPage);
  }

  function handlePaginationButtonClick(btnType) {
    if (btnType === BUTTON_TYPES.NEXT) {
      currentPage++
      setPageLoad();
      // Set new GET parameters.
      urlParams.set('current_page', currentPage);
      urlParams.set('per_page', perPage);
      sendData(urlParams);
    }
    else if (btnType === BUTTON_TYPES.PREV) {
      currentPage--;
      setPageLoad();
      // Set new GET parameters.
      urlParams.set('current_page', currentPage);
      urlParams.set('per_page', perPage);
      sendData(urlParams);
    }
  }

// Load first result and set page number when page is loaded.
  document.addEventListener('DOMContentLoaded', function () {
    load();
    setPageNumber(currentPage);
  })


// Get perPage value from the select.
  document.getElementById('page-size').addEventListener('change', function() {
    perPage = this.value;
    urlParams.set('per_page', perPage);
    sendData(urlParams);
    load();
  });

// Click on the Next button.
  btnNext.addEventListener('click', function (event) {
    event.preventDefault();
    handlePaginationButtonClick('next');
  });


  function sendData(urlParams) {
    // Replace get parameters in browser.
    window.history.replaceState(null, null, `?${urlParams.toString()}`);
  }


// Click on the Prev button.
  btnPrev.addEventListener('click', function (event) {
    event.preventDefault();
    handlePaginationButtonClick('prev');
  })
})()
