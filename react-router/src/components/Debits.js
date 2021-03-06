//Debits
import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import { Link } from 'react-router-dom';
import "./Styles.css"

class Debits extends Component {

  constructor(props) {
    super(props);
    this.state = {
      debit: {
        id: 0,
        description: '',
        amount: 0,
        date: new Date().toISOString()
      },
    }
  }

  makeDebit = (debitsData, found) => {
    let currData = debitsData;
    let foundMatch = found;
    let table = [];
    //found is false when we get 404 error
    if (!foundMatch) {
      table.push(<tr key={-1}><td>No Debits</td></tr>);
      return table;
    } else {
      currData.forEach(debit => {
        let id = debit.id
        let description = debit.description;
        let amount = Number(debit.amount).toFixed(2);
        let date = debit.date
        table.push(
          <tr className="row" key={id}>
            <td className="text">Description: {description}</td>
            <td className="text">Amount: {amount}</td>
            <td className="text">Date: {date}</td>
          </tr>
        );
      });
    }
    return table;
  }
  handleChange = (e) => {
    const newDebit = { ...this.state.debit }
    const inputField = e.target.name
    const inputValue = e.target.value
    newDebit[inputField] = inputValue
    this.setState({ debit: newDebit })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleUpdate(this.state.debit)
  }

  render() {
    let handleUpdate = this.props.handleUpdate;
    return (
      <div className="page">
        <h1> Debits </h1>
        User: {this.props.user.userName}
        <br />
        <br />
        <AccountBalance accountBalance={this.props.accountBalance} />
        <br />
        <Link to="/">Return to Home</Link>
        <br />
        <br />
        <br />
        <div>
          <table className="table" id="data">
            <tbody>
              {this.makeDebit(this.props.apiData, this.props.found)}
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="description">Enter a description</label> &ensp;
            <input type="text" name="description" onChange={this.handleChange} value={this.state.debit.description} />
          </div>
          <br />
          <div>
            <label htmlFor="amount">Enter an amount</label> &ensp;
            <input type="number" name="amount" onChange={this.handleChange} value={this.state.debit.amount} />
          </div>
          <br />
          <button className="button">Add Debit</button>
        </form>
      </div>
    );
  }
}

export default Debits;