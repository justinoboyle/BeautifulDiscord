# myDiscord

This is a rewrite effort and should be considered incomplete.

The modular modification suite for [Discord](https://discordapp.com)

### Features

* Custom styles with hot-reloading
* Plugin system with local plugins and full `npm` support
* Proxy support

### Credit where it's due

The lightweight design paradigm and some of the original source code come from [BeautifulDiscord](https://github.com/leovoel/BeautifulDiscord). Show him some love!
*(fun fact- the original MyDiscord was a fork of BeautifulDiscord!)*

### Installation

Gonna make this easy. [Install Node and npm](https://nodejs.org/en/download/) first. If you're using macOS or Linux you can do this through your package manager.

**Make sure Discord is open!**

```
npm install --global mydiscord
mydiscord
```

This will place the myDiscord config files in your home folder under `.mydiscord`. (`~/.mydiscord`)

Want to do something else? No problem. Just pass a command line argument like so:

```
npm install --global mydiscord
mydiscord --install ~/.some-other-folder/
```

Easy, huh?

### How do I install custom CSS styles?

This is really easy. Open up the `[mydiscord root]/styles.css` file and add away! Enjoy hot reloading :)

If, for some strange reason, you want to remove this functionality, remove the `mydiscord-plugin-csshot` plugin.

### How do I install plugins?

This is really easy if you're using `mydiscord-plugin-gui` (the default!)

Open Discord > Click Settings > MyDiscord > Install Plugin > Type the plugin identifier

Identifiers can take multiple different forms, but for developers, it's simply the same syntax as if a `npm install --save` was prepended.

@developers: psst, you can load [from local disk as well](docs/developing/DEVELOPING.md)

### Updating from legacy

Installing the latest myDiscord *should* automatically update you to the lastest version, but you may want to manually uninstall the old version of MyDiscord:

```
python3 -m pip uninstall mydiscord
```

### Developing plugins

Check out the [documentation here](docs/developing/DEVELOPING.md)!

### Contributions

So you want to contribute! Awesome!

#### Rules for contributions

* Use your head and be kind

#### How to contribute

So, myDiscord is split up into a bunch of different codebases.

| Repository                                                             | Purpose                                                                                                                                                        |
|------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [mydiscord](https://github.com/justinoboyle/mydiscord)                 | Handles most of the user-facing documentation and injects [`mydiscord-inject`](https://github.com/justinoboyle/mydiscord-inject) into the application.         |
| [mydiscord-inject](https://github.com/justinoboyle/mydiscord-inject)   | The payload injected into the user-facing application.                                                                                                         |
| [mydiscord-manager](https://github.com/justinoboyle/mydiscord-manager) | The repository cloned into the root repository following installation. The user's plugins are built here and the injected payload searches for the build here. |