import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link } from '../../routes';
import compiledAis from '../../ethereum/ais';
import web3 from '../../ethereum/web3';

class AccIndex extends Component {
render(){
 return (
  <Layout>
    <div>
     <h3> This is the AIS Index page!!! </h3>
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
     <h4>To Update Accounts</h4>
     <Link route="/ais/update">
       <a>
         <Button
            floated="left"
            content="Update Account"
            icon="add circle"
            primary
         />
       </a>
     </Link>
   </div>

   <div>
   <br />
    <h4>To Search Accpounts</h4>
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

export default AccIndex;
