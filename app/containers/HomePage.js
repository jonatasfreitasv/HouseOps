// @flow
import React, { Component } from 'react';
import { Mosaic } from 'react-mosaic-component';

import {
  Button,
  Intent
} from '@blueprintjs/core';


import Query from '../components/Query';
import SideBar from '../components/sidebar/SideBar';
import DatabaseConnConfiguration from '../components/DatabaseConnConfiguration';

const { getGlobal } = require('electron').remote;

const screenView = getGlobal('screenView');

if (process.env.NODE_ENV === 'production') {
  screenView('HomePage');
}

export const THEMES = {
  ['Blueprint']: 'mosaic-blueprint-theme',
  ['Blueprint Dark']: 'mosaic-blueprint-theme pt-dark',
  ['None']: '',
};

const ELEMENT_MAP: { [viewId: string]: any } = {
  a: <SideBar />,
  b: <Query />,
  c: <div>Bottom Right Window</div>,
};

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  openDatabaseConnectionConfigure = () => {
    this.databaseConnConfiguration.handleOpen();
  };

  reload = () => {
    location.reload(true); // eslint-disable-line
  };

  render() {
    return (

      <div>

        { !localStorage.getItem('database_host') ?
          <div className="no-database">
            <h3>No database is configured</h3>
            <br />
            <Button
              intent={Intent.PRIMARY}
              onClick={this.openDatabaseConnectionConfigure}
              text="Configure database connection here"
            />
            <DatabaseConnConfiguration
              ref={instance => { this.databaseConnConfiguration = instance; }}
            />
          </div> : null }

        { localStorage.getItem('database_host') ?
          <Mosaic
            renderTile={(id) => ELEMENT_MAP[id]}
            initialValue={{
              direction: 'row',
              first: 'a',
              second: {
                direction: 'column',
                first: 'b',
                second: 'c',
              },
              splitPercentage: 15
            }}
            className="mosaic-blueprint-theme pt-dark"
          /> : null }

      </div>

    );
  }
}
