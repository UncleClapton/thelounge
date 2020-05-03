<h1 align="center">
	<img
		width="300"
		alt="The Lounge"
		src="https://raw.githubusercontent.com/thelounge/thelounge/master/client/img/logo-vertical-transparent-bg.svg?sanitize=true">
</h1>

<h3 align="center">
	Modern web IRC client designed for self-hosting
</h3>

<p align="center">
	<strong>
		<a href="https://thelounge.chat/">Website</a>
		•
		<a href="https://thelounge.chat/docs">Docs</a>
		•
		<a href="https://demo.thelounge.chat/">Demo</a>
	</strong>
</p>
<p align="center">
	<a href="https://demo.thelounge.chat/"><img
		alt="#thelounge IRC channel on freenode"
		src="https://img.shields.io/badge/freenode-%23thelounge-415364.svg?colorA=ff9e18"></a>
	<a href="https://yarn.pm/thelounge"><img
		alt="npm version"
		src="https://img.shields.io/npm/v/thelounge.svg?colorA=333a41&maxAge=3600"></a>
	<a href="https://github.com/thelounge/thelounge/actions"><img
		alt="Build Status"
		src="https://github.com/thelounge/thelounge/workflows/Build/badge.svg"></a>
	<a href="https://npm-stat.com/charts.html?package=thelounge&from=2016-02-12"><img
		alt="Total downloads on npm"
		src="https://img.shields.io/npm/dy/thelounge.svg?colorA=333a41&colorB=007dc7&maxAge=3600&label=Downloads"></a>
</p>

<p align="center">
	<img src="https://raw.githubusercontent.com/thelounge/thelounge.github.io/master/img/thelounge-screenshot.png" width="550">
</p>

## Fork Overview

This fork comes with a number of changes documented below. For now, only manual install is available.

- **Network/Channel list changes** - Middle clicking on a channel will close it. - Unread message counters can now represent all unread messages or just mentions. (configurable in settings) - Network channels can be sorted alphabetically from an option in the network lobby's context menu. - The sidebar's scroll area only includes channels so the logo, "jump to" input, and footer buttons are always visible. - The class names `has-unread` and `has-mention` are applied to channels so each respective status can be styled. This fork does not apply any special style by default.

- **Image viewer changes** - Add option to invert zoom scroll direction, which also is now the **right** way around by default 😉. - Images do not take up 100% of the window on open anymore. The default size has been limited to 75% total view area. - Make scroll event passive because it can be and it's more performant.

- **Dialog changes** - Made open/close animation more consistent and graceful.

- **Userlist/chat changes** - Nicks can now be colored by user string matching rules (configurable in settings) - Users in the userlist can be grouped by user string matching rules (configurable in network settings)

- **"better" user info tracking** - TL only consistently tracks nick changes, and only does so for channels. This fork aims to "fix" some of these shortcommings for various features that rely on the whole user string, and not just the nick. - tracks ident and vhost consistently, and makes great effort to keep them up to date when possible. - Keeps query windows up to date when a user changes their nick.

And a lot more to come! (... someday ... maybe.)

### A note on updates from upstream

Generally speaking I will only pull from the base repo when there is a release, but this is not guaranteed to be immediate. Expect about a week or so after a stable release for me to go through the motions of updating the fork. If there are glaring issues with the update then this may be delayed futher. There may also be times where I pull ahead of a release because features in development are highly desirable (Mentions list popup, for instance) and are fleshed out enough to be usable. I do perform my own testing to ensure there is a decent amount of stability after updating, but the extent of it will vary and sometimes things might break. As per usual, This software comes with ZERO Warranty.

I'm a very active IRC operator and I have no plans on abandoning this repo for now. If this situation changes than it will be posted here.

tl;dr: Don't expect base TL features early in this fork, but it may sometimes happen and also may also sometimes break things.

## Overview

- **Modern features brought to IRC.** Push notifications, link previews, new message markers, and more bring IRC to the 21st century.
- **Always connected.** Remains connected to IRC servers while you are offline.
- **Cross platform.** It doesn't matter what OS you use, it just works wherever Node.js runs.
- **Responsive interface.** The client works smoothly on every desktop, smartphone and tablet.
- **Synchronized experience.** Always resume where you left off no matter what device.

To learn more about configuration, usage and features of The Lounge, take a look at [the website](https://thelounge.chat).

The Lounge is the official and community-managed fork of [Shout](https://github.com/erming/shout), by [Mattias Erming](https://github.com/erming).

## Installation and usage

The Lounge requires latest [Node.js](https://nodejs.org/) LTS version or more recent.
[Yarn package manager](https://yarnpkg.com/) is also recommended.
If you want to install with npm, `--unsafe-perm` is required for a correct install.

### Running stable releases

Please refer to the [install and upgrade documentation on our website](https://thelounge.chat/docs/install-and-upgrade) for all available installation methods.

### Running from source

The following commands install and run the development version of The Lounge:

```sh
git clone https://github.com/thelounge/thelounge.git
cd thelounge
yarn install
NODE_ENV=production yarn build
yarn start
```

When installed like this, `thelounge` executable is not created. Use `node index <command>` to run commands.

⚠️ While it is the most recent codebase, this is not production-ready! Run at
your own risk. It is also not recommended to run this as root.

## Development setup

Simply follow the instructions to run The Lounge from source above, on your own
fork.

Before submitting any change, make sure to:

- Read the [Contributing instructions](https://github.com/thelounge/thelounge/blob/master/.github/CONTRIBUTING.md#contributing)
- Run `yarn test` to execute linters and test suite
- Run `yarn build` if you change or add anything in `client/js` or `client/views`
- `yarn dev` can be used to start The Lounge with hot module reloading
