import React, { Component } from 'react';
import {Button, ButtonToolbar, Jumbotron, ButtonGroup, DropdownButton, Navbar} from 'react-bootstrap';
import Viewer from './Viewer';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TwitchVideoEmbed from './TwitchVideoEmbed';
import Flexbox from 'flexbox-react';
import Select from 'react-select';

class App extends Component {
  constructor(props) {
		super(props);
		this.player = null;
		this.state = {
			channels: ['drdisrespectlive', 'dyrus', 'foobar', 'twitch'],
      search: '',
      channelToChange: 0,
      sideNavClassName: 'sidenav'
		};
	}

  changeChannel(channels) {
    this.setState({channels});
  }

  handleSubmit(i) {
    const index = parseInt(i, 10);
    const channels = [...this.state.channels.slice(0, index), this.state.search, ...this.state.channels.slice(index+1)];
    console.log('channels', channels);
    this.setState({channels: [...this.state.channels.slice(0, index), this.state.search, ...this.state.channels.slice(index+1)]});
  }

  handleChange(event) {
    this.setState({search: event.target.value});
  }

  handleSelectChange(event) {
    const channelToChange = event.target.value;
    this.setState({channelToChange});
  }

  openNav() {
    this.setState({sideNavClassName: this.state.sideNavClassName + ' ' + 'open'})
  }
  closedNav() {
    this.setState({sideNavClassName: 'sidenav'})
  }

  render() {
    return (
      <div className="App">
      <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Multi-Twitch-Viewer</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Text>
          Signed in as: <Navbar.Link href="#">SalmonBros</Navbar.Link>
        </Navbar.Text>
        <Navbar.Text pullRight>
          Have a great day!
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
        <div id="mySidenav" className={this.state.sideNavClassName} >
          <Button className="btn btn-link" onClick={() => this.closedNav()}>X</Button>
          <ButtonGroup vertical className="pull-left">
            <Button onClick={() => this.changeChannel('dyrus')}>Twitch</Button>
          </ButtonGroup>
        </div>
        <Button onClick={() => this.openNav()}>open</Button>
        <Flexbox justifyContent='center' height='75%'>
           <TwitchVideoEmbed channel={this.state.channels[0]}></TwitchVideoEmbed>
           <TwitchVideoEmbed channel={this.state.channels[1]}></TwitchVideoEmbed>
        </Flexbox>
       <Flexbox justifyContent='center' height='75%'>
           <TwitchVideoEmbed channel={this.state.channels[2]}></TwitchVideoEmbed>
           <TwitchVideoEmbed channel={this.state.channels[3]}></TwitchVideoEmbed>
        </Flexbox>
        <form>
          <label>
            Name:
            <input type="text" value={this.state.search} onChange={this.handleChange.bind(this)} />
          </label>
          <select value={this.state.channelToChange} onChange={this.handleSelectChange.bind(this)}>
            <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option>
            <option value="3">4</option>
          </select>
          <input type="Button" value="Submit" onClick={this.handleSubmit.bind(this, this.state.channelToChange)}/>
        </form>
      </div>
    );
  }
}

export default App;
