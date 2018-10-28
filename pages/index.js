import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';
import compiledAis from '../ethereum/ais';

class AisIndex extends Component {

  //life cycle method - getInitialProps()
  static async getInitialProps() {
  const totAccNumbers = await compiledAis.methods.totAccNrs().call();

  //this return will actually return props to class
  return { totAccNumbers };
  }

  render(){
   return (
    <Layout>
      <div>
       <h3>Tot Number of Accounts: { this.props.totAccNumbers }</h3>
       <h4>To Add Accounts</h4>

       <Link route="/ais/new">
         <a>
           <Button
              floated="left"
              content="Create Account"
              icon="add circle"
              primary
           />
         </a>
       </Link>
      </div>
     <div>
     <br />
      <h4>To Search Accounts</h4>
      <Link route="/ais/search">
        <a>
          <Button
             floated="left"
             content="Search Account"
             icon="add circle"
             primary
          />
        </a>
      </Link>
    </div>
   </Layout>
   );
   }
}

export default AisIndex;
