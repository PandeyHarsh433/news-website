import React from "react";

const Card = ({ headline }) => {
  return (
    <div className="card">
      <div className="card-body">
        <img src={headline.urlToImage} alt="" className="card-img-top" />
        <h5 className="card-title">{headline.title}</h5>
        <p>{headline.description}</p>
        <p className="card-meta">
          <span className="card-author">{headline.author}</span>
          <span className="card-source">{headline.source.name}</span>
          <span className="card-published">{headline.publishedAt}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
