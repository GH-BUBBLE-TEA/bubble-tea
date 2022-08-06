import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../store/users";
import { getSingleUser, _setUser } from "../store/singleUser";

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
    this.props.getSingleUser(this.props.id);
    this.setState({
      username: this.props.user.username || "",
      email: this.props.user.email || "",
    });
  }
  componentWillUnmount() {
    this.props.clearUser();
  }

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
  id: state.auth.id,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateUser: (user) => dispatch(updateUser(user, history)),
  getSingleUser: (id) => dispatch(getSingleUser(id)),
  clearUser: () => dispatch(_setUser({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
