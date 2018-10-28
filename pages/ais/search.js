import React, { Component } from 'react';
import { Form, Card, Button, Message, Input} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link , Router  } from '../../routes';
import Ais from '../../ethereum/ais';

class AccSearch extends Component {
    state = {
      accNr: '',
      loading: false,
      errorMessage: ''
    };
    onSubmit = async event => {
      event.preventDefault();
      this.setState({ loading: true, errorMessage: '' });
      Router.pushRoute(`/ais/${this.state.accNr}/update`);
      this.setState({ loading: false });
    };

render(){
 return (
  <Layout>
      <h3>Enter an Account number to Search</h3>
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
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading ={this.state.loading}>Search!</Button>
      </Form>
    </Layout>
    );
    }
};

export default AccSearch;
