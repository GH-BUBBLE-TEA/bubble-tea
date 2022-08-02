import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getBubbleTeas } from "../store/bubbleTeas";

class Menu extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>
        <h1>MENU</h1>;
        {bubbleTeas.map((bubbleTea) => {
          <div key={bubbleTea.id}>
            return (
            <div>
              <Link to={`/bubbleteas/${bubbleTea.id}`}>
                <img src={bubbleTea.imageUrl} />
                <h3>{bubbleTea.teaName}</h3>
              </Link>
              <p>Base Price: {bubbleTea.defaultPrice}</p>
            </div>
            )
          </div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ bubbleTeas }) => ({
  bubbleTeas,
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(getBubbleTeas()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
