import React from "react";

function cardRepos(props) {
  return (
    <div className="repo">
      <img src={props.avatar} alt="avatar" />
      <h4 className="login">{props.login}</h4>
      <a className="url" href={props.url}>
        {props.name}
      </a>
    </div>
  );
}

export default cardRepos;
