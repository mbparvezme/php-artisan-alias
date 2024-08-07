# PHP Artisan Alias

> Developed by **[M B Parvez](https://www.mbparvez.me)**, support by **[TheUI](https://www.theui.dev)**.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Quick Start](#quick-start)
  - [Default Alias](#default-alias)
  - [Custom Alias](#custom-alias)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Overview

A VS Code extension to simplify the usage of "php artisan" commands in Laravel projects by allowing you to set a custom alias. By default, the alias is set to "art," but users can modify it using the `phpArtisanAlias.setAlias` setting or the `Set PHP Artisan Alias` command.

## Features

- Set a custom alias for the "php artisan" command.
- Automatically detect Laravel projects.
- Supports setting aliases in various terminal environments (cmd, PowerShell, Unix-like systems).

## Installation

1. Install the extension from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mbparvezme.php-artisan-alias).
2. Reload or restart VS Code to activate the extension.

## Usage

### Quick Start

1. Open a Laravel project in VS Code.
2. Open a terminal in VS Code.
3. Use `art` instead of `php artisan`.

### Default Alias

By default, the alias is set to `art`. You can use this alias in any terminal within a Laravel project to run `php artisan` commands. For example:

```sh
art migrate
```

## Custom Alias

To set a custom alias:

1. Open your VS Code settings. Navigate to `File` > `Preferences` > `Settings` or use `Ctrl+,` / `cmd+,`.
2. Search for **HP Artisan Alias**.
3. Set your desired alias in the `phpArtisanAlias.alias` setting.

```json
"phpArtisanAlias.alias": "artisan"
```

This would set the alias to `artisan`, enabling commands like `artisan migrate` instead of `php artisan migrate`.

Alternatively, you can use the command palette to set the alias:

1. Open the command palette using `Ctrl+Shift+P` or `Cmd+Shift+P`.
2. Search for `Set PHP Artisan Alias` and run the command.
3. Enter your desired alias.


## Contributing

- Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/mbparvezme/php-artisan-alias/issues).
- Contact the publisher at [www.mbparvez.me](https://www.mbparvez.me).

## License

[MIT](https://github.com/mbparvezme/php-artisan-alias/blob/master/LICENSE.md)