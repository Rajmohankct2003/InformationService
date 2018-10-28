import React, { Component } from 'react';
import { Form, Card, Button, Message, Input} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link , Router } from '../../routes';
import compiledAis from '../../ethereum/ais';
import web3 from '../../ethereum/web3';

class AccUpdate extends Component {
  state = {
    accNr: '',
    gAcc: '',
    accBlocked: '',
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

    onClick = event => {
      event.preventDefault();
      const { accountNr } = this.props;
        Router.pushRoute(`/ais/${accountNr}/delete`);
    };

  onSubmit = async event => {
    event.preventDefault();

    const { accNr, gAcc, accBlocked } = this.state;

    this.setState({
      loading: true,
      errorMessage: ''
    });

    try {
      const accounts = await web3.eth.getAccounts();
      await compiledAis.methods.updAccount(
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
             value={this.state.gAcc}
             placeholder={this.props.gAcc}
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
             placeholder={this.props.accBlocked}
             onChange={event =>
               this.setState({
                  accBlocked: event.target.value,
                  errorMessage: ''
                 })
             }
           />
         </Form.Field>
         <Form.Field>
           <label>Account Status</label>
           <Input
             value={this.props.accStatus}
           />
         </Form.Field>
         <Message error header="Oops!" content={this.state.errorMessage} />
         <Button
//            icon="add circle"
            primary loading ={this.state.loading}>Update!
        </Button>
       </Form>
       <br/>
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

   export default AccUpdate;
