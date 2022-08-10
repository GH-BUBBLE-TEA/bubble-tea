import React from "react";
import { connect } from "react-redux";
import { getUsers, deleteUser, updateAdminStatus } from "../store/users";
import { Link } from "react-router-dom";
import { getSingleUser } from "../store/singleUser";
/**
 * COMPONENT
 */
export class Home extends React.Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getSingleUser(this.props.id);
  }

  updateStatus(user, adminStatusValue) {
    this.props.updateAdminStatus({ ...user, isAdmin: !adminStatusValue });
  }
  render() {
    const { isAdmin, users } = this.props;
    console.log(users);

    return (
      <div>
        <h2 class="large-page-name">Welcome, {this.props.user.username}!</h2>
        <div>
          {isAdmin ? (
            <React.Fragment>
              <div>
                {" "}
                Users:
                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Admin User</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            {user.isAdmin ? "TRUE" : "FALSE"}
                            <button
                              onClick={() =>
                                this.updateStatus(user, user.isAdmin)
                              }
                            >
                              Change Status
                            </button>
                          </td>

                          <td>
                            <button
                              onClick={() => this.props.deleteUser(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div>Order Lists:</div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>Profile:</h2>
              <h3>Username: {this.props.user.username}</h3>
              <h3>Email: {this.props.user.email}</h3>
              <Link to={`/home/edit/${this.props.user.id}`}>
                <button>Edit</button>
              </Link>
              <Link to="/orders">
                <h2>Orders</h2>
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    isAdmin: !!state.auth.isAdmin,
    id: state.auth.id,
    users: state.users,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  getUsers: () => dispatch(getUsers()),
  getSingleUser: (id) => dispatch(getSingleUser(id)),
  deleteUser: (id) => dispatch(deleteUser(id, history)),
  updateAdminStatus: (user) => dispatch(updateAdminStatus(user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
