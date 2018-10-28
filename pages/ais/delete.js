import React, { Component } from 'react';
import { Form, Card, Button, Message, Input} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link , Router } from '../../routes';
import compiledAis from '../../ethereum/ais';
import web3 from '../../ethereum/web3';

class AccDelete extends Component {
  state = {
    accNr: '',
    loading: false,
    errorMessage: ''
  };
  //life cycle method - getInitialProps()
  static async getInitialProps(props) {
  const _accnr = parseInt(props.query.accnr);

  const accSummary = await compiledAis.methods.getAccount(_accnr).call();

    //this return will actually return props to class
    return {
      accountNr: accSummary[0],
      gAcc: accSummary[1],
      accIndex: accSummary[2],
      accBlocked: accSummary[3],
      accStatus: accSummary[4]
     };
   }

  onClick = async event => {
    event.preventDefault();

    const { accNr } = this.state;
    const { accountNr } = this.props;

    this.setState({
      accNr: {accountNr},
      loading: true,
      errorMessage: ''
    });

    try {
      const accounts = await web3.eth.getAccounts();
      await compiledAis.methods.delAccount(accNr)
       .send({ from: accounts[0]});

      Router.pushRoute(`/ais/${this.state.accNr}/delete`);
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }

    this.setState({ loading: false });
  };

render(){
 return (
    <Layout>
       <h3>Account Details </h3>
       <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}  >
         <Form.Field>
           <label>Account Number</label>
           <Input
             value={this.state.accNr}
             placeholder={this.props.accountNr}
             onChange={event =>
               this.setState({
                  accNr: event.target.placeholder,
                  errorMessage: ''
               })
             }
           />
         </Form.Field>

         <Form.Field>
           <label>G Account</label>
           <Input
             value={this.props.gAcc}
           />
         </Form.Field>

         <Form.Field>
           <label>Account Blocked</label>
           <Input
             value={this.props.accBlocked}
           />
         </Form.Field>
         <Form.Field>
           <label>Account Status</label>
           <Input
             value={this.props.accStatus}
           />
         </Form.Field>
         <Message error header="Oops!" content={this.state.errorMessage} />
       </Form>
       <Button
          floated="left"
          content="Delete!"
          primary
          onClick={this.onClick}
       />
    </Layout>
    );
  }
};

   export default AccDelete;
