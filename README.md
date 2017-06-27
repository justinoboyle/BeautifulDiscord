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

### Updating from legacy

Installing the latest MyDiscord *should* automatically update you to the lastest version, but you may want to manually uninstall the old version of MyDiscord:

```
python3 -m pip uninstall mydiscord
```