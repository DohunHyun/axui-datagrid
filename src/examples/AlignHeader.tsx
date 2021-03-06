import * as React from 'react';

import { Button, Divider } from 'antd';
import { Wrapper, Segment } from 'components';
import { DataGrid } from 'axui-datagrid';

class AlignHeader extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    const gridData = require('examples/data/data-basic.json');

    this.state = {
      columns: [
        { key: 'id', width: 60, label: 'ID' },
        { key: 'title', width: 200, label: 'Title' },
        { key: 'writer', label: 'Writer' },
        { key: 'date', label: 'Date', formatter: 'date' },
        { key: 'money', label: 'Money', formatter: 'money' },
      ],
      data: gridData,
      options: {},
    };
  }

  public changeConfig(props: any) {
    const processor = {
      alignLeft: () => {
        this.setState({
          options: {
            header: {
              align: 'left',
            },
          },
        });
      },
      alignCenter: () => {
        this.setState({
          options: {
            header: {
              align: 'center',
            },
          },
        });
      },
      alignRight: () => {
        this.setState({
          options: {
            header: {
              align: 'right',
            },
          },
        });
      },
    };

    if (props in processor) {
      processor[props]();
    } else {
      this.setState(props);
    }
  }

  render() {
    return (
      <Wrapper>
        <Segment padded>
          <h1>Align Header</h1>
          <p>This example changes the 'options.header.align' property.</p>

          <DataGrid
            height={this.state.height}
            style={{ fontSize: '12px' }}
            columns={this.state.columns}
            data={this.state.data}
            options={this.state.options}
          />

          <Divider />

          <Button onClick={() => this.changeConfig('alignLeft')}>
            align left
          </Button>
          <Button onClick={() => this.changeConfig('alignCenter')}>
            align center
          </Button>
          <Button onClick={() => this.changeConfig('alignRight')}>
            align right
          </Button>
        </Segment>
      </Wrapper>
    );
  }
}

export default AlignHeader;
