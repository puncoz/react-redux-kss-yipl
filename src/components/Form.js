import React, { Component } from "react";
import uuidv1 from "uuid";
import { addArticle } from "./../store/actions";
import { connect } from "react-redux";

class Form extends Component {
    constructor() {
        super();

        this.state = {
            title: "Some default title"
        };
    }

    handleInput(event) {
        this.setState({
            title: event.currentTarget.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { title } = this.state;
        const { addArticle } = this.props;

        const id = uuidv1();

        const article = { title, id };

        addArticle(article);

        this.setState({
            title: ""
        });
    }

    render() {
        const { title } = this.state;

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={this.handleInput.bind(this)} />
                </div>

                <button type="submit" className="btn btn-success btn-lg">SAVE</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addArticle: article => dispatch(addArticle(article))
    }
}

export default connect(null, mapDispatchToProps)(Form);