import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import bgimage from "../images/bgimage.jpg";

const GET_BOOK = gql`
  query book($bookId: String) {
    book(id: $bookId) {
      _id
      title
      author
      description
      published_year
      publisher
      updated_date
    }
  }
`;

const DELETE_BOOK = gql`
  mutation removeBook($id: String!) {
    removeBook(id: $id) {
      _id
    }
  }
`;

class Show extends Component {
  render() {
    return (
      <Query
        pollInterval={500}
        query={GET_BOOK}
        variables={{ bookId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div
              className="bgcontainer"
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                zIndex: 1,
                width: "100%",
                height: "100%",
                background: `url(${bgimage})`,
                backgroundSize: "50%",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className="container"
                style={{
                  background: "#fff4f485",
                }}
              >
                <div className="panel panel-default">
                  <div className="panel-heading"     style={{
                        color: "#ffb5b5",
                        margin: "10px 0",
                        padding: "10px 0",
                      }}>
                    <h4
                      style={{
                        margin: "10px 0",
                        padding: "10px 0",
                      }}
                    >
                      <Link to="/"   style={{
                        color: "#132743",
                      }}>Back to the book list</Link>
                    </h4>
                    <h3
                      className="panel-title"
                      style={{
                        color: "#407088",
                        margin: "5px 0",
                        padding: "5px 0",
                      }}
                    >
                      {data.book.title}
                    </h3>
                  </div>
                  <div className="panel-body">
                    <dl>
                      <dt>Author:</dt>
                      <dd>{data.book.author}</dd>
                     
                      <dt>Published Year:</dt>
                      <dd>{data.book.published_year}</dd>
                      <dt>Publisher:</dt>
                      <dd>{data.book.publisher}</dd>
                 
                      <dt>Description:</dt>
                      <dd>{data.book.description}</dd>
                      <dt>Updated:</dt>
                      <dd>{data.book.updated_date}</dd>
                    </dl>
                    <Mutation
                      mutation={DELETE_BOOK}
                      key={data.book._id}
                      onCompleted={() => this.props.history.push("/")}
                    >
                      {(removeBook, { loading, error }) => (
                        <div>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              removeBook({ variables: { id: data.book._id } });
                            }}
                          >
                            <Link
                              to={`/edit/${data.book._id}`}
                              className="btn btn-success"
                            >
                              Edit
                            </Link>
                            &nbsp;
                            <button type="submit" className="btn btn-danger">
                              Delete
                            </button>
                          </form>
                          {loading && <p>Loading...</p>}
                          {error && <p>Error :( Please try again</p>}
                        </div>
                      )}
                    </Mutation>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Show;
