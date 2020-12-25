import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import bgimage from "./images/bgimage.jpg";
const GET_BOOKS = gql`
  {
    books {
      _id
      title
      author
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Query pollInterval={500} query={GET_BOOKS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <>
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
                <div className="container"   style={{
                  background: "#fff4f485",

                }}>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title" style={{color:"#407088", margin :"10px 0" ,padding:"15px 0"}}>LIST OF BOOKS</h3>
                      <h4>
                        <Link to="/create">Add Book</Link>
                      </h4>
                    </div>
                    <div className="panel-body">
                      <table className="table table-stripe">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Author</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.books.map((book, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{book.title}</td>
                              <td>{book.author}</td>
                              <td>
                                <Link to={`/show/${book._id}`}>More Info</Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}

export default App;
