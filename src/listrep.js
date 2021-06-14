import React from "react";
import CardRepos from "./cardrep";

class ListRepos extends React.Component {
  render() {
    return (
      <div id="repos">
        {this.props.data.map((repo, index) => {
          if (index >= this.props.start && index <= this.props.end) {
            return (
              <div class="card-group">
                <div class="card">
                  <CardRepos
                    key={index}
                    avatar={repo.owner.avatar_url}
                    login={repo.owner.login}
                    url={repo.url}
                    name={repo.name}
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default ListRepos;
