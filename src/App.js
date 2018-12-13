// @flow

import * as React from 'react';
import './App.css';

type Props = {

}
type State = {
  count: number,
  summary_buy: number,
  summary: number,
  price: number,
  price_new: number,
  comission: number,
  tax: number,
  double_comission: boolean,
}
class App extends React.Component<Props, State> {
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
    let price_count = this.state.price * this.state.count;
    let price_after_buying = price_count - (price_count * this.state.tax / 100) * 2 - this.state.comission * modifier;
    let price_zero = price_count - price_after_buying + price_count;

    this.setState({
      summary_buy: price_after_buying,
      summary: price_zero,
      price_new: (price_zero / this.state.count),
    });
  }

  onChangeHandler = (event: any) => {
      let inputName = event.currentTarget.name;
      event.currentTarget.value = event.currentTarget.value.replace(/[^0-9.]/g, "");
      let inputVal = event.currentTarget.value;

      this.setState({
        [inputName]: (inputName === "double_comission") ? !this.state.double_comission : inputVal,
      });
  }

  submitHandler = (event: any) => {
    event.preventDefault();

    this.calculate()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <h3>Помощник для Тинькофф.Инвестиций</h3>
            <label>
              Цена покупки акции:
              <input type="text" onChange={this.onChangeHandler} name="price" placeholder="price" />
            </label>
            <label>
              Количество (в лоте):
              <input type="text" onChange={this.onChangeHandler} name="count" placeholder="count" />
            </label>
            <label>
              Комиссия за сделку:
              <input type="text" onChange={this.onChangeHandler} name="tax" placeholder="tax" value={this.state.tax} />
            </label>
            <label>
              Комиссия сервиса:
              <input type="text" onChange={this.onChangeHandler} name="comission" placeholder="comission" value={this.state.comission} />
            </label>
            <label>
              <small>Двойная комиссия</small> <input type="checkbox" name="double_comission" checked={this.state.double_comission} onChange={this.onChangeHandler} />
            </label>
            <button onClick={this.submitHandler} className="btn">Посчитать</button>
            <code className="results">
              <div>Реальная цена лота: <strong>{this.state.summary_buy.toFixed(2)}</strong></div>
              <div>Цена лота для выхода в ноль: <strong>{this.state.summary.toFixed(2)}</strong></div>
              <div>Цена акции для выхода в ноль: <strong>{this.state.price_new.toFixed(2)}</strong></div>
            </code>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
