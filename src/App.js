import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    count: 0,
    summary_buy: 0,
    summary: 0,
    price: 0,
    price_new: 0,
    comission: 99,
    tax: 0.3,
    double_comission: true,
  };
  calculate = () => {
    let modifier = this.state.double_comission ? 2 : 1;
    let price_count = parseFloat(this.state.price * this.state.count);
    let price_after_buying = price_count - parseFloat((price_count * this.state.tax / 100) * 2) - parseFloat(this.state.comission * modifier);
    let price_zero = price_count - price_after_buying + price_count;

    this.setState({
      summary_buy: price_after_buying.toFixed(2),
      summary: price_zero.toFixed(2),
      price_new: parseFloat(price_zero / this.state.count).toFixed(2),
    });
  }
  onChangeHandler = (event) => {
    let inputName = event.currentTarget.name;
    event.currentTarget.value = event.currentTarget.value.replace(/[^0-9.]/g, "");
    let inputVal = event.currentTarget.value;

    this.setState({
      [inputName]: (inputName === "double_comission") ? !this.state.double_comission : inputVal,
    });
  }
  submitHandler = (event) => {
    event.preventDefault();

    this.calculate()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Калькулятор точки безубыточности для Тинькофф.Инвестиций</h1>
          <input onChange={this.onChangeHandler} name="price" placeholder="price" />
          <input onChange={this.onChangeHandler} name="count" placeholder="count" />
          <input onChange={this.onChangeHandler} name="tax" placeholder="tax" value={this.state.tax} />
          <input onChange={this.onChangeHandler} name="comission" placeholder="comission" value={this.state.comission} />
          <label><small>Двойная комиссия</small> <input type="checkbox" name="double_comission" checked={this.state.double_comission} onChange={this.onChangeHandler} /></label>
          <button onClick={this.submitHandler} className="btn">Посчитать</button>
          <div>{this.state.summary_buy + " [" + this.state.summary + " (" + this.state.price_new + ")]"}</div>
        </header>
      </div>
    );
  }
}

export default App;
