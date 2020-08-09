import React from "react";
import PropTypes from "prop-types";
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import "../App.css";

const addUser = gql`
  mutation ($username: String!) {
    insert_user (
      objects: [{
        username: $username
      }]
    ) {
      returning {
        id
        username
      id
      }
    }
}`;

const login = (username, insert_user) => {
 console.log(username); 
 insert_user()
}

const LandingPage = (props) => {
  const handleKeyPress = (key, mutate, loading) => {
    if (!loading && key.charCode === 13) {
      mutate();
    }
  };
  return (
    <Mutation
      mutation={addUser}
      variables={{
        username: props.username
      }}
      onCompleted={(data) => {
        props.login(data.insert_user.returning[0].id);
      }}
      onError={(data) => {
        alert(data)
        props.setUsername('');
      }}
    >
      {
        (insert_user, { data, loading, error }) => {
          return (
            <div>
              <div className="jumbotron login-container">
                <h1 className="display-4">Hello, and welcome to AlexChat!</h1>
                <p className="lead">This is a chat room where you can chat with the one and only Alex!*</p>
                <hr className="my-4" />
                <input
                  type="text"
                  className="form-control username"
                  placeholder="Enter your username"
                  value={props.username}
                  onChange={(e) => props.setUsername(e.target.value)}
                  onKeyPress={(key) => handleKeyPress(key, insert_user, loading)}
                  disabled={loading}
                />
                <div className="input-group-append groupAppend">
                  <button
                    className="btn btn-outline-secondary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      if (props.username.match(/^[a-zA-Z0-9_-]{3,15}$/g)) {
                        login(props.username, insert_user);
                      } else {
                        alert("Invalid username. Spaces and special characters not allowed. Please try again");
                        props.setUsername('');
                      }
                    }}
                    disabled={loading || props.username === ''}
                  >
                    {loading ? 'Please wait ...' : 'Get Started'}
                  </button>
                </div>

              </div>
              <p className="tinytext">*other alex's do not exist, anyone who tells you otherwise is breaking rule 152 of the AlexCode and will be shot on sight.</p>
            </div>
          );
        }
      }
    </Mutation>
  );
}

LandingPage.propTypes = {
  auth: PropTypes.object,
  isAuthenticated: PropTypes.bool
};

export default LandingPage;
