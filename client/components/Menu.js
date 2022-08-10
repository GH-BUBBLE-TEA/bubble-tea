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

  // dataSearch(e) {
  //   const value = e.target.value.toLowerCase();
  //   this.props.bubbleTeas.forEach((bubbleTea) => {
  //     const isVisible = bubbleTea.teaName.toLowerCase().includes(value);
  //     bubbleTea.toggle("hide", !isVisible);
  //   });
  // }

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
    // console.log(process.env.STRIPE_SECRET_KEY);
    return (
      <div>
        {/* <div className="search-wrapper">
          <label htmlFor="search">Search Products:</label>
          <input type="search" id="search" onChange={this.dataSearch()} />
        </div> */}
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
            id="category"
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
              <div key={bubbleTea.id}>
                <div>
                  <Link to={`/menu/${bubbleTea.id}`}>
                    <img className="menu-image" src={bubbleTea.imageURL} />
                    <h3>{bubbleTea.teaName}</h3>
                  </Link>
                  <p>Price: ${bubbleTea.defaultPrice}</p>
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
