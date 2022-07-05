/**
 * Винести змінні які ти мутуєш в окремий об'єкт як ключі
 * Пройтись по змінних і замінити let на const у місцях де це можливо
 * Змінні в camelCase
 * DRY principle: накнайменше дублікацій коду
 * Переписати проміси на async/await
 * */


(function (){
  const pagination = {

  }
  let page = 1;
  let per_page = 2;
  let total = document.getElementById('total');
  let total_count = 0;
  let page_number_span = document.getElementById('page-number');
  let page_number = 1
  let btn_next = document.getElementById('btn_next');
  let btn_prev = document.getElementById('btn_prev');
  const url = 'https://reqres.in/api/users?';

// Send request and work with data.
  function load() {
    fetch(url + new URLSearchParams({
      page: page,
      per_page: per_page,
    }))
        .then(function (respose) {
          return respose.json()
        })
        .then(function (responseData) {
          total_count = responseData.total;
          // Render total results.
          total.innerHTML = `${per_page} of ${responseData.total} Records`;

          let result = document.querySelector('#result');
          // Clear result.
          result.innerHTML = ""

          // load responce data.
          let data = responseData.data

          let html = data.map(function(item) {
            // here we need to generate html for object.
            return `<div class="user-info"><div class="user-first-name">${item.first_name}</div><div class="user-last-name">${item.last_name}</div><div class="user-email">${item.email}</div><div class="user-avatar"><img src="${item.avatar}"></div></div>`
          })

          result.insertAdjacentHTML('afterbegin', html.join(''))
        })
  }


  function numPages() {
    return Math.ceil(total_count / per_page);
  }

  // Set number of page.
  function setPageNumber(page_number) {
    page_number_span.innerHTML = page_number;

    // Hide Prev button if we are on the first page.
    btn_prev.style.visibility = page_number === 1 ? 'hidden' : 'visible';

    // Hide Next button if we are on the last page.
    btn_next.style.visibility = page_number === numPages() ? 'hidden' : 'visible';
  }



// Load first result and set page number when page is loaded.
  document.addEventListener('DOMContentLoaded', function () {
    load();
    setPageNumber(page_number);
  })


// Get per_page value from the select.
  document.getElementById('page-size').addEventListener('change', function() {
    per_page = this.value
    load()
  });

// Click on the Next button.
  btn_next.addEventListener('click', function () {
    event.preventDefault();
    page++
    page_number++
    setPageNumber(page_number)
    load()
  });

// Click on the Prev button.
  btn_prev.addEventListener('click', function () {
    event.preventDefault();
    page--
    page_number--
    setPageNumber(page_number)
    load()
  })
})()
