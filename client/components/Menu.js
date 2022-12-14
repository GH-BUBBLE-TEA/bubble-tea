import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getBubbleTeas } from "../store/bubbleTeas";

export class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      teaFilter: "All",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchData();
  }

  handleChange(event) {
    this.setState({ teaFilter: event.target.value });
  }

  render() {
    const allbubbleTeas = this.props.bubbleTeas.filter((singleBubbleTea) => {
      if (this.state.teaFilter === "Milk Tea") {
        return singleBubbleTea.teaCategories === "Milk Tea";
      } else if (this.state.teaFilter === "Fruit Tea") {
        return singleBubbleTea.teaCategories === "Fruit Tea";
      } else if (this.state.teaFilter === "Latte") {
        return singleBubbleTea.teaCategories === "Latte";
      } else {
        return singleBubbleTea;
      }
    });
    return (
      <div>
        {this.props.isAdmin ? (
          <Link to="/menu/create">
            <button id="addProduct">Add a new product</button>
          </Link>
        ) : (
          ""
        )}

        <div>
          Filter by Category:
          <select
            id="filterCategory"
            value={this.state.teaFilter}
            onChange={this.handleChange}
          >
            <option value="All">All</option>
            <option value="Milk Tea">Milk Tea</option>
            <option value="Fruit Tea">Fruit Tea</option>
            <option value="Latte">Latte</option>
          </select>
        </div>

        <div className="bubble-tea-list">
          {allbubbleTeas.map((bubbleTea) => {
            return (
              <div key={bubbleTea.id} className="product-info">
                <div>
                  <Link className="bubble-tea1" to={`/menu/${bubbleTea.id}`}>
                    <img className="menu-image" src={bubbleTea.imageURL} />
                    <h3 className="teaName">{bubbleTea.teaName}</h3>
                  </Link>
                  <p className="price">${bubbleTea.defaultPrice}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bubbleTeas: state.bubbleTeas,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(getBubbleTeas()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
