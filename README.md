YourDiscord
================

Simple Python script that adds CSS hot-reload and Custom JavaScript support to Discord.

## Credit where it's due

I quite liked [leovoel's BeautifulDiscord](https://github.com/leovoel/BeautifulDiscord)'s lightweight implementation of stylesheets in Discord, so I modified leovoel's script to also include JavaScript support.

Because this is a fork, most of the code (and the usage section) was written by [leovoel](https://github.com/leovoel), so go show him some love.

## Usage

Just invoke the script when installed. If you don't pass the `--css` and `--js` flags, the resources
will be placed wherever the Discord app resources are found, which is not a very convenient
location.

**NOTE:** Discord has to be running for this to work in first place.
The script works by scanning the active processes and looking for the Discord ones.

(yes, this also means you can fool the program into trying to apply this to some random program named Discord)

```
$ yourdiscord --css ~/discord.css --js ~/discord.js
Found Discord Canary under /Applications/Discord Canary.app/Contents/MacOS

Done!

You may now edit your CSS in /Users/justin/discord.css,
which will be reloaded whenever it's saved.
You can also edit your JavaScript in /Users/justin/discord.js
,but you must reload (CMD/CTRL + R) Discord to re-run it

*Do not insert code that you do not understand, as it could steal your account!*

Relaunching Discord now...
$
```

Pass the `--revert` flag to remove the extracted `app.asar` (it's the `resources/app` folder)
and rename `original_app.asar` to `app.asar`. You can also do this manually if your Discord
install gets screwed up.

```
$ yourdiscord --revert
Found Discord Canary under /Applications/Discord Canary.app/Contents/MacOS

Reverted changes, no more CSS hot-reload :(
$
```

You can also run it as a package - i.e. `python3 -m yourdiscord` - if somehow you cannot
install it as a script that you can run from anywhere.

## Installing

```
python3 -m pip install -U https://github.com/justinoboyle/YourDiscord/archive/master.zip
```

Usage of a virtual environment is recommended, to not pollute your global package space.

## Requirements

- Python 3.x (no interest in compatibility with 2.x, untested on Python 3.x versions below 3.4)
- `psutil` library: https://github.com/giampaolo/psutil

Normally, `pip` should install any required dependencies.

## Themes

Some people have started a theming community for the original BeautifulDiscord over here:
https://github.com/beautiful-discord-community/resources/

They have a Discord server as well:
https://discord.gg/EDwd5wr
