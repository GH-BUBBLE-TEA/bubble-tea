import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../store/users";
import { getSingleUser } from "../store/singleUser";

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getSingleUser(id);
    console.log("username:", this.props.user);
    this.setState({
      username: this.props.username || "",
      email: this.props.email || "",
    });
  }
  //   componentWillUnmount() {
  //     this.props.clearBubbleTea();
  //   }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateUser({ ...this.props.user, ...this.state });
  }

  render() {
    const { username, email } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form id="user-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input name="username" onChange={handleChange} value={username} />

          {/* <label htmlFor="password">Password:</label>
          <input name="password" onChange={handleChange} value={password} /> */}

          <label htmlFor="email">Email:</label>
          <input name="email" onChange={handleChange} value={email} />

          <button type="submit">Submit</button>
          <Link to="/home">Cancel</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  username: state.auth.username,
  email: state.auth.email,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateUser: (user) => dispatch(updateUser(user, history)),
  getSingleUser: (id) => dispatch(getSingleUser(id)),
  //   clearBubbleTea: () => dispatch(_setBubbleTea({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
