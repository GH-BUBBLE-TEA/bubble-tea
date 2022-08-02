import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>
        <h1>MENU</h1>;
        {drinks.map((drink) => {
          <div key={drink.id}>
            return (
            <div>
              <Link to={`/drinks/${drink.id}`}>
                <img src={drink.image} />
                <h3>{drink.name}</h3>
              </Link>
              <p>Base Price: {drink.price}</p>
            </div>
            )
          </div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ drinks }) => ({
  drinks,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
