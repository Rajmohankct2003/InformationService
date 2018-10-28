import React, { Component } from 'react';
import { Form, Card, Button, Message, Input} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link , Router } from '../../routes';
import compiledAis from '../../ethereum/ais';
import web3 from '../../ethereum/web3';

class AccNew extends Component {

  state = {
    accNr: '',
    gAcc: '',
    accBlocked: '',
    loading: false,
    errorMessage: ''
  };

  onSubmit = async event => {
    event.preventDefault();

    const { accNr, gAcc, accBlocked } = this.state;

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await compiledAis.methods.insertAccs(
        accNr,
        gAcc,
        accBlocked
      )
       .send({ from: accounts[0]});

    //   Router.pushRoute(`/ais/`);
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }

    this.setState({ loading: false });
  };

  //life cycle method - getInitialProps()
  static async getInitialProps() {
  const totAccNumbers = await compiledAis.methods.totAccNrs().call();

  //this return will actually return props to class
  return { totAccNumbers };
  }

render(){
 return (
    <Layout>
       <h3>Create a new Account</h3>
       <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}  >
         <Form.Field>
           <label>Account Number</label>
           <Input
             value={this.state.accNr}
             onChange={event =>
               this.setState({
                 accNr: event.target.value,
                 errorMessage: ''
                 })
             }
           />
         </Form.Field>

         <Form.Field>
           <label>G Account</label>
           <Input
             value={this.state.gAcc}
             onChange={event =>
               this.setState({
                  gAcc: event.target.value,
                 errorMessage: ''
               })
             }
           />
         </Form.Field>

         <Form.Field>
           <label>Account Blocked</label>
           <Input
             value={this.state.accBlocked}
             onChange={event =>
               this.setState({
                  accBlocked: event.target.value,
                  errorMessage: ''
                 })
             }
           />
         </Form.Field>
         <Message error header="Oops!" content={this.state.errorMessage} />
         <Button primary loading ={this.state.loading}>Create!</Button>
       </Form>
    </Layout>
    );
    }
  };

export default AccNew;
