# Price Settings
A simple widget for a bPanel instance that lets you set the price feed
for exchange rate display across your app.

## Requirements
- bpanel v1.0.0-beta
- [@bpanel/settings](https://github.com/bpanel-org/settings)
- [@bpanel/curl](https://github.com/bpanel-org/curl)
- [@bpanel/price](https://github.com/bpanel-org/price)

## Installation
Note that you will need to have the bPanel Settings plugin and the Price plugins installed
otherwise the widget will not be displayed. This plugin will automatically
install these dependencies if it is not found.

**Important:** @bpanel/curl needs to be installed manually. Because it is a _server-side plugin_
its API is slightly different. This will be updated in a future release of bPanel.

Using [bpanel-cli](https://github.com/bpanel-org/bpanel-cli)

```bash
$ bpanel-cli i @bpanel/curl @bpanel/connection-manager
```

Read about manual plugin installation [here](https://bpanel.org/docs/install-plugins.html#how-it-works)

![screenshot](https://raw.githubusercontent.com/bpanel-org/price-settings/master/screenshot.gif "price settings widget")

_Note that the display in the footer is a separate plugin, but it updates with the settings change._