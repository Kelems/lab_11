import React from "react";
import axios from "axios";
import ListRepos from "./listrep";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      start: 0,
      end: 4,
      pagination: "non-visible",
      pages: 1
    };
  }

  getRepos() {
    axios("https://api.github.com/repositories?since=1000").then((response) => {
      this.setState(() => {
        return {
          data: response.data,
          page: 1,
          start: 0,
          end: 9,
          pagination: "visible",
          pages: 5
        };
      });
    });
  }

  arrPages = [];

  pagesInit(length) {
    for (let i = 0; i < length; i++) this.arrPages[i] = i;
  }

  search() {
    let text = document.getElementById("search-text").value;

    if (text !== "") {
      let sort = document.getElementById("sort-item").value;
      let url = "https://api.github.com/search/repositories?q=" + text;

      if (sort === "stars") url += "&sort=" + sort;

      if (sort === "forks") url += "&sort=" + sort;

      if (sort === "followers") url += "&sort=" + sort;

      axios(url)
        .then((response) => {
          if (response.data.items.length !== 0)
            this.setState(() => {
              return {
                data: response.data.items,
                page: 1,
                start: 0,
                end: 9,
                pagination: "visible",
                pages: 3
              };
            });
          else alert("Не найдено.");
        })
        .catch((error) => {
          alert("Не удалось обработать инструкции '" + text + "'.");
        });
    }
  }

  changeActivePage() {
    let pages = document.getElementsByClassName("pages");

    for (let i = 0; i < pages.length; i++) {
      let pageNumber = +pages[i].textContent;
      if (pageNumber === this.state.page)
        pages[i].classList.toggle("active-page");
    }
  }

  clearActivePage() {
    let pages = document.getElementsByClassName("pages");

    for (let i = 0; i < pages.length; i++)
      pages[i].classList.remove("active-page");
  }

  nextPage() {
    this.setState((prevState) => {
      if (
        this.state.page < this.state.pages &&
        this.state.page >= 1 &&
        this.state.data.length !== 0
      )
        return {
          page: prevState.page + 1,
          start: prevState.start + 10,
          end: prevState.end + 10
        };
      else if (
        this.state.page === this.state.pages &&
        this.state.data.length !== 0
      )
        return { page: 1, start: 0, end: 9 };
    });
    this.changeActivePage();
  }

  prevPage() {
    this.setState((prevState) => {
      if (
        this.state.page <= this.state.pages &&
        this.state.page > 1 &&
        this.state.data.length !== 0
      )
        return {
          page: prevState.page - 1,
          start: prevState.start - 10,
          end: prevState.end - 10
        };
      else if (this.state.page === 1 && this.state.data.length !== 0)
        return {
          page: this.state.pages,
          start: (this.state.pages - 1) * 10,
          end: this.state.pages * 10 - 1
        };
    });
    this.changeActivePage();
  }

  render() {
    return (
      <div className="container">
        {this.pagesInit(10)}
        <button
          type="button"
          class="btn btn-outline-primary btn-lg"
          onClick={() => this.getRepos()}
        >
          Получить данные по 50 git-репозиториям
        </button>

        <div id="search">
          <div class="row">
            <div class="col-sm">
              <select id="sort-item" class="custom-select">
                <option value="none">None</option>
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
                <option value="followers">Followers</option>
              </select>
            </div>
            <div class="col-sm">
              <input
                type="text"
                class="form-control"
                aria-label="Text input with radio button"
                id="search-text"
              />
            </div>
            <div class="col-sm">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                onClick={() => this.search()}
              >
                Поиск
              </button>
            </div>
          </div>
        </div>
        <ListRepos
          data={this.state.data}
          start={this.state.start}
          end={this.state.end}
        />
        <div id={this.state.pagination}>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            id="prev"
            onClick={() => this.prevPage()}
          >
            Предыдущая
          </button>
          {this.arrPages.map((el, index) => {
            if (index < this.state.pages)
              return (
                <div className="pages" key={index} id={index + 1}>
                  {index + 1}
                </div>
              );
          })}

          <button
            type="button"
            class="btn btn-secondary btn-sm"
            id="next"
            onClick={() => this.nextPage()}
          >
            Следующая
          </button>
        </div>
        {this.clearActivePage()}
        {this.changeActivePage()}
      </div>
    );
  }
}

export default App;
