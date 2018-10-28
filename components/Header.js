import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, Router } from '../routes';

export default () => {
  return (
    <Menu style={{ marginTop: '10px'}}>
      <Link route="/">
       <a className="item">
          Welcome To Account Information Service
       </a>
      </Link>
    <Menu.Menu position="right">
    <Link route="/">
     <a className="item">
        Accounts
     </a>
    </Link>
    <Link route="/ais/new">
     <a className="item">
         +
     </a>
    </Link>
    </Menu.Menu>
    </Menu>
  )
}
