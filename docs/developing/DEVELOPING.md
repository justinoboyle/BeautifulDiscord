# Developing for myDiscord

### Getting Started

#### Setting up a workspace

We can get myDiscord to get us up and running really quickly. 

```
mydiscord --create testplugin
```

We also probably want to turn on dev mode (this will make your client a bit slower to load, but will recompile the build on every refresh.)

```
mydiscord --dev-mode true
```

myDiscord will start up an interactive shell that will ask you a few questions. You can probably hit enter on all of them for now.

Okay, so once you see `Plugin workspace created!` we can go ahead and jump into our dev workspace. You can either `cd` to the directory listed (this is easier if you're on Windows), or you can use the myDiscord shell:

```
mydiscord --shell testplugin
```

This will automatically open us up with your default shell into our dev workspace. If you have Visual Studio Code installed, now's a good time to do `code .`.

From now on, if you get any `command not found`'s while using some of the inbuilt myDiscord helper commands, prepend them with `mydiscord-dev `. (Sorry, Windows users!)

If you are using `mydiscord --shell`, type `live &` to open a live development interface in the background in your current shell (neat!). If you are on Windows or `cd`'d to the directory, you may want to open another window and type `mydiscord-dev live testplugin`. 

#### Displaying a banner when the application loads.

Once your workspace is open, navigate inside the `src` folder and pop open `index.js`. You should see something like this:

```javascript
import { eventStream } from 'mydiscord';
import package from '../package';

eventStream.on('pageload', () => console.log(`Loaded ${package.name} version ${package.version}`));
```

Okay, so first we need `mydiscord-plugin-banners`. Not a problem! Tab back to your shell and type `npm install mydiscord-plugin-banners --save`.

Now we can import it, along with the myDiscord DOM tree:

```javascript
import { eventStream, domTree } from 'mydiscord';
import { Banner } from 'mydiscord-plugin-banners';
```

...and we can use it:

```javascript
eventStream.on('pageload', () => {
    console.log(`Loaded ${package.name} version ${package.version}`);
    new Banner({
        "text": "Loaded my example plugin!"
    }).display(domTree);
})
```

#### Persistence

Let's say we want to store how many times the user reloaded the page.

First, let's import our pluginStorage object from myDiscord:

```javascript
import { eventStream, pluginStorage } from 'mydiscord';
```

Now we can use it like so:

```javascript
eventStream.on('pageload', () => {
    let times = pluginStorage['testplugin-load-count'] || 0;
    times++;
    console.log(`Loaded ${package.name} ${times} times.`);
    pluginStorage['testplugin-load-count'] = times;
})
```

Simple, right?