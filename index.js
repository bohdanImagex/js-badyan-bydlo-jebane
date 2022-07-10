/**
 * Винести змінні які ти мутуєш в окремий об'єкт як ключі +
 * Пройтись по змінних і замінити let на const у місцях де це можливо +
 * Змінні в camelCase +
 * DRY principle: накнайменше дублікацій коду +
 * Переписати проміси на async/await +
 * */


(function (){
  const pagination = {
    page: 1,
    perPage: 2,
    total: document.getElementById('total'),
    totalCount: 0,
    pageNumberSpan: document.getElementById('page-number'),
    pageNumber: 1,
    btnNext: document.getElementById('btn_next'),
    btnPrev: document.getElementById('btn_prev'),
    url: 'https://reqres.in/api/users?'
  }

// Send request and work with data.
async function load() {
  const response = await fetch(pagination.url + new URLSearchParams({
    page: pagination.page,
    per_page: pagination.perPage,
  }));
  const responseData = await response.json();
  pagination.totalCount = responseData.total;
  // Render total results.
  pagination.total.innerHTML = `${pagination.perPage} of ${responseData.total} Records`;

  const result = document.querySelector('#result');
  // Clear result.
  result.innerHTML = ""

  // load responce data.
  const data = responseData.data
  const html = data.map(function(item) {
    // here we need to generate html for object.
    return `<div class="user-info"><div class="user-first-name">${item.first_name}</div><div class="user-last-name">${item.last_name}</div><div class="user-email">${item.email}</div><div class="user-avatar"><img src="${item.avatar}"></div></div>`
  })

  result.insertAdjacentHTML('afterbegin', html.join(''))
}


  function numPages() {
    return Math.ceil(pagination.totalCount / pagination.perPage);
  }

  // Set number of page.
  function setPageNumber(pageNumber) {
    pagination.pageNumberSpan.innerHTML = pageNumber;

    // Hide Prev button if we are on the first page.
    pagination.btnPrev.style.visibility = pageNumber === 1 ? 'hidden' : 'visible';

    // Hide Next button if we are on the last page.
    pagination.btnNext.style.visibility = pageNumber === numPages() ? 'hidden' : 'visible';
  }

  function setPageLoad() {
    setPageNumber(pagination.pageNumber);
    load();
  }

  function paginationClick(btnType) {
    if (btnType === 'next') {
      pagination.page++;
      pagination.pageNumber++;
      setPageLoad();
    }
    else if (btnType === 'prev') {
      pagination.page--;
      pagination.pageNumber--;
      setPageLoad();
    }
  }

// Load first result and set page number when page is loaded.
  document.addEventListener('DOMContentLoaded', function () {
    load();
    setPageNumber(pagination.pageNumber);
  })


// Get perPage value from the select.
  document.getElementById('page-size').addEventListener('change', function() {
    pagination.perPage = this.value
    load()
  });

// Click on the Next button.
  pagination.btnNext.addEventListener('click', function (event) {
    event.preventDefault();
    paginationClick('next')
  });

// Click on the Prev button.
  pagination.btnPrev.addEventListener('click', function (event) {
    event.preventDefault();
    paginationClick('prev')
  })
})()
