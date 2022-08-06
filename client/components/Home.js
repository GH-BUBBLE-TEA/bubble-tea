import React from "react";
import { connect } from "react-redux";
import { getUsers, deleteUser, updateAdminStatus } from "../store/users";

/**
 * COMPONENT
 */
export class Home extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  updateStatus(user, adminStatusValue) {
    this.props.updateAdminStatus({ ...user, isAdmin: !adminStatusValue });
  }
  render() {
    const { username, isAdmin, users } = this.props;
    console.log(users);

    return (
      <div>
        <h3>Welcome, {username}</h3>
        <div>
          {isAdmin ? (
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
          ) : (
            <h4>order history</h4>
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
    username: state.auth.username,
    isAdmin: !!state.auth.isAdmin,
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  getUsers: () => dispatch(getUsers()),
  deleteUser: (id) => dispatch(deleteUser(id, history)),
  updateAdminStatus: (user) => dispatch(updateAdminStatus(user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
