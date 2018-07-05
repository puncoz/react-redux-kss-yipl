import React from "react";
import { connect } from "react-redux";

const List = ({ articles }) => (
    <ul className="list-group list-group-flush">
        {articles.map(article => (
            <li className="list-group-item" key={article.id}>
                {article.title}
            </li>
        ))}

        {articles.length === 0 && (
            <li className="list-group-item">
                No articles.
            </li>
        )}
    </ul>
);

const mapStateToProps = state => {
    return {
        articles: state.articles
    };
};

export default connect(mapStateToProps)(List);