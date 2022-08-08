import React, { Component } from "react";
import { createBubbleTea } from "../store/bubbleTeas";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CreateBubbleTea extends Component {
  constructor() {
    super();
    this.state = {
      teaName: "",
      teaCategories: "",
      imageURL: "",
      defaultPrice: 0.0,
      description: "",
      stock: 0.0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createBubbleTea({ ...this.state });
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
        <input name="description" onChange={handleChange} value={description} />

        <label htmlFor="stock">Bubble Tea Stock:</label>
        <input name="stock" onChange={handleChange} value={stock} />

        <button type="submit">Submit</button>
        <Link to="/menu">Cancel</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createBubbleTea: (bubbleTea) => dispatch(createBubbleTea(bubbleTea, history)),
});

export default connect(null, mapDispatchToProps)(CreateBubbleTea);
