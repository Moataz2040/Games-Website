export class Ui {
  constructor() {
    this.gamesContain = document.querySelector(".games-data");
    this.dataContains = document.querySelector(".game-details");
    this.links = document.querySelectorAll(".nav-link");
    this.homePage = document.querySelector(".home");
    this.detailsPage = document.querySelector(".game-details");
    this.links = document.querySelectorAll(".nav-link");
    let linksArray = Array.from(this.links);
    for (let i = 0; i < linksArray.length; i++) {
      linksArray[i].addEventListener("click", () => {
        let category = linksArray[i].textContent;
        this.displayGame(category);
        this.activeLink(i);
        // here we used arrow function to make this reffer to the Ui class
        // if we used normal function this will reffer to linksArray[i]
        // because the normal function make new this
      });
    }
    this.displayGame();
    this.showDetails();
  }
  async displayGame(category = "mmorpg") {
    // ***************changeApi
    //****************** */

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "7c0b9faf25msh3a740b86d04f307p1fba76jsn3ef75e75eb95",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    let api = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    let response = await api.json();
    let cartona = "";
    for (let i = 0; i < response.length; i++) {
      cartona =
        cartona +
        `<div class="card-contain p-2">
               <div class="card col">
                 <div class="card-details">
                   <img
                     src=${response[i].thumbnail}
                     class="card-img-top"
                     alt="..."
                   />
                   <div class="card-body pb-0 px-0">
                     <div class="card-text1 d-flex justify-content-between">
                       <h3 class="text-white">${response[i].title}</h3>
                       <a href="#" class="badge btn btn-primary">Free</a>
                     </div>
                     <div class="card-text2 text-white-50">
                       <p>${response[i].short_description.split("").splice(0,60).join("")}</p>
                     </div>
                   </div>
                 </div>
                 <footer
                   class="card-footer d-flex justify-content-between text-white"
                 >
                   <span>${response[i].genre}</span>
                   <span>${response[i].platform}</span>
                 </footer>
               </div>
               </div>`;
      this.gamesContain.innerHTML = cartona;
      // showGameDetails
      this.showDetails(response);
    }
  }
  showDetails(response) {
    let cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
      const element = cards[i];
      element.addEventListener("click", () => {
        let gameId = response[i].id;
        this.displayDetails(gameId);
        this.homePage.classList.add("d-none");
        this.detailsPage.classList.remove("d-none");
      });
    }
  }
  activeLink(index) {
    this.active = document.querySelector(".active");
    this.links[index].classList.add("active");
    this.active.classList.remove("active");
  }
  async displayDetails(gameId) {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "7c0b9faf25msh3a740b86d04f307p1fba76jsn3ef75e75eb95",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    let api2 =await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
      options
    );
    let response2 = await api2.json();
    this.dataContains.innerHTML = `<div class="container">
  <header class="py-4 d-flex justify-content-between">
    <h1 class="mb-1">Details Game</h1>
    <button
      type="button"
      class="btn-close btn-close-white"
      aria-label="Close"
      id="close"
    ></button>
  </header>
  <div class="row">
    <div class="col-md-4">
      <figure>
        <img src="${response2.thumbnail}" alt="" class="w-100" />
      </figure>
    </div>
    <div class="col-md-8">
      <h3>Title: ${response2.title}</h3>
      <p>
        Category:
        <span class="badge text-bg-info">${response2.genre}</span>
      </p>
      <p>
        Platform:
        <span class="badge text-bg-info">${response2.platform}</span>
      </p>
      <p>
        Status:
        <span class="badge text-bg-info">Live</span>
      </p>
      <p>
      ${response2.description}
      </p>
      <a href="${response2.game_url}" target="_blank" class="btn btn-outline-warning">Show Game</a>
    </div>
  </div>
</div>`;
this.hideDetails();
  }
  hideDetails() {
    let close = document.querySelector("#close");
    close.addEventListener("click",()=>{
      for (let i = 0; i < this.links.length; i++) {
        this.detailsPage.classList.add("d-none");
        this.homePage.classList.remove("d-none");
      }
    });
  }
}
