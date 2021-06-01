const content = document.getElementById('marvel-div');
const inputSearch = document.getElementById('inputSearch');
const spinner = document.getElementById('spinner');

const get_heroes = () => {
  const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=3f27975c2bee82f4e5bb3985d074a58f&hash=e4a490760339d35fa51a426e64251329'; 
  fetch(urlAPI)
    .then(res => res.json())
    .then(res => {
      res.data.results.forEach(e =>{
      render_heroes(e);
      spinner.style.display = "none";
      })
    })
    .catch(err => alert(err));
};

const render_heroes = e => {
  spinner.style.display = "block";
  const hero = `
    <div class="col-md-4">
      <a href="${e.urls[0].url}" target="_blank">
        <img src="${e.thumbnail.path}.${e.thumbnail.extension}" alt="${e.name}" class="img-thumbnail">
      </a>
      <h3 class="title text-light">${e.name}</h3>
    </div>`;
  content.insertAdjacentHTML('beforeEnd', hero);
};

const search_heroes = name => {
  let urlAPI = '';
  let hero = encodeURIComponent(name);
  if(hero === ''){
    urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=3f27975c2bee82f4e5bb3985d074a58f&hash=e4a490760339d35fa51a426e64251329'; 
  } else {
    urlAPI = `https://gateway.marvel.com:443/v1/public/characters?name=${hero}&ts=1&apikey=3f27975c2bee82f4e5bb3985d074a58f&hash=e4a490760339d35fa51a426e64251329`;
  }
  fetch(urlAPI)
    .then(res => res.json())
    .then(res => {
      res.data.results.forEach(e =>{
        render_heroes(e);
        spinner.style.display = "none";
      })
    })
    .catch(err => alert(err));
};

inputSearch.addEventListener('keyup', e => {
  e.preventDefault();
  content.innerHTML = search_heroes(e.target.value);
});

get_heroes();
