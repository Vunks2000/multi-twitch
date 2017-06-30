import React from 'react';
import 'twitch-embed';
const size = 480;

export default class TwitchVideoEmbed extends React.Component {
	static propTypes = {
		channel: React.PropTypes.string,
		video: React.PropTypes.string,
		play: React.PropTypes.bool
	};

	constructor(props) {
		super(props);
		this.state = {
			lastChannel: ''
		};
	}

	componentDidMount() {
		this.setPlayer.call(this);
		this.setState({lastChannel: this.props.channel || ''});
	}

	componentDidUpdate() {
		if (this.state.lastChannel !== this.props.channel) {
			this.setState({lastChannel: this.props.channel});
			this.setPlayer.call(this);
		}
	}

	getId(props) {
		if (this.props.channel) {
			return `twitch-${this.props.channel}`;
		}
		if (this.props.video) {
			return `twitch-${this.props.video}`;
		}
	}

	setPlayer() {
		const options = {};
		const id = this.getId();
		if (this.props.channel) {
			options.channel = this.props.channel;
		} else {
			options.video = this.props.video;
		}
		if (this.player) {
			console.log(this.player);
			this.player.destroy();
		}
		if (typeof window !== 'undefined' && window.Twitch) {
			this.player = new window.Twitch.Player(id, options);

			this.player.setHeight(size * 0.562);
			this.player.setWidth(size);
		}
	}

	render() {
		return (
			<div id={this.getId.call(this) || ''} className="twitch-video-embed"></div>
		);
	}
}
