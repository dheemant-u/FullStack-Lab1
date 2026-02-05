import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

class AddFood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "Fruits",
            calories: "",
            benefits: "",
            message: ""
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, category, calories, benefits } = this.state;

        fetch("http://localhost:5001/foods", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, category, calories, benefits })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ message: "Food added successfully!", name: "", calories: "", benefits: "" });
            })
            .catch(err => this.setState({ message: "Error adding food" }));
    };

    render() {
        return (
            <div className="container">
                <h1>Add New Food</h1>
                {this.state.message && <p className="success-msg" style={{ color: 'green', fontWeight: 'bold' }}>{this.state.message}</p>}
                <form onSubmit={this.handleSubmit} className="food-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
                    <input type="text" name="name" placeholder="Food Name" value={this.state.name} onChange={this.handleChange} required style={{ padding: '10px' }} />
                    <select name="category" value={this.state.category} onChange={this.handleChange} style={{ padding: '10px' }}>
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Grains">Grains</option>
                    </select>
                    <input type="number" name="calories" placeholder="Calories" value={this.state.calories} onChange={this.handleChange} required style={{ padding: '10px' }} />
                    <textarea name="benefits" placeholder="Benefits" value={this.state.benefits} onChange={this.handleChange} required style={{ padding: '10px' }} />
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#282c34', color: 'white', border: 'none', cursor: 'pointer' }}>Add Food</button>
                </form>
                <br />
                <Link to="/">← Back to Home</Link>
            </div>
        );
    }
}

export default AddFood;
