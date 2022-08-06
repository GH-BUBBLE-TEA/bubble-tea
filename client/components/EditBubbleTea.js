import React, { Component } from "react";
import { getSingleBubbleTea, _setBubbleTea } from "../store/singleBubbleTea";
import { updateBubbleTea } from "../store/bubbleTeas";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class EditBubbleTea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teaName: "",
      teaCategories: "",
      imageURL: "",
      defaultPrice: "",
      description: "",
      stock: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSingleBubbleTea(id);
    this.setState({
      teaName: this.props.bubbleTea.teaName || "",
      teaCategories: this.props.bubbleTea.teaCategories || "",
      imageURL: this.props.bubbleTea.imageURL || "",
      defaultPrice: this.props.bubbleTea.defaultPrice || "",
      description: this.props.bubbleTea.description || "",
      stock: this.props.bubbleTea.stock || "",
    });
  }

  componentWillUnmount() {
    this.props.clearBubbleTea();
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateBubbleTea({ ...this.props.bubbleTea, ...this.state });
  }

  render() {
    const {
      teaName,
      teaCategories,
      imageURL,
      defaultPrice,
      description,
      stock,
    } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form id="product-form" onSubmit={handleSubmit}>
          <label htmlFor="teaName">Bubble Tea Name:</label>
          <input name="teaName" onChange={handleChange} value={teaName} />

          <label htmlFor="teaCategories">Category:</label>
          <select
            name="teaCategories"
            onChange={handleChange}
            value={teaCategories}
          >
            <option value="Milk Tea">Milk Tea</option>
            <option value="Fruit Tea">Fruit Tea</option>
            <option value="Latte">Latte</option>
          </select>

          <label htmlFor="imageURL">Bubble Tea Image:</label>
          <input name="imageURL" onChange={handleChange} value={imageURL} />

          <label htmlFor="defaultPrice">Bubble Tea Price:</label>
          <input
            name="defaultPrice"
            onChange={handleChange}
            value={defaultPrice}
          />

          <label htmlFor="description">Bubble Tea Description:</label>
          <input
            name="description"
            onChange={handleChange}
            value={description}
          />

          <label htmlFor="stock">Bubble Tea Stock:</label>
          <input name="stock" onChange={handleChange} value={stock} />

          <button type="submit">Submit</button>
          <Link to="/menu">Cancel</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  bubbleTea: state.singleBubbleTea,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateBubbleTea: (bubbleTea) => dispatch(updateBubbleTea(bubbleTea, history)),
  getSingleBubbleTea: (id) => dispatch(getSingleBubbleTea(id)),
  clearBubbleTea: () => dispatch(_setBubbleTea({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBubbleTea);
