# PHP Artisan Alias Extension User Guide

Developed by **[M B Parvez](https://www.mbparvez.me)**, support by **[Gosoft](https://www.gosoft.io)**.

## Overview

The PHP Artisan Alias extension for Visual Studio Code simplifies Laravel development by allowing you to set a custom alias for the `php artisan` command in the integrated terminal. This guide walks you through installation, configuration, usage, and testing of the extension to optimize your workflow.

## Installation

1. **Install the Extension**: Search for "PHP Artisan Alias" in the Visual Studio Code Marketplace and install it.
2. **Reload Visual Studio Code**: After installation, reload VS Code to activate the extension.

## Default Alias

By default, the extension sets the alias to `art`. This allows you to use `art` instead of `php artisan` in the terminal immediately after installation.

## Configuration

To customize the alias:

1. **Open Settings**: Navigate to `File` > `Preferences` > `Settings` (or use `Ctrl+,`).
2. **Set Alias**: Search for `phpArtisanAlias.alias` and set your preferred alias. For example:

```json
"phpArtisanAlias.alias": "artisan"
```

This would set the alias to `artisan`, enabling commands like `artisan migrate` instead of `php artisan migrate`.

## Usage

Once configured:

1. **Open the Command Palette**: Press `Ctrl+Shift+P`.
2. **Run Command**: Type and select `Set PHP Artisan Alias` to apply your configured alias (`phpArtisanAlias.alias`) to the terminal.


## Example Workflow

Here’s a typical workflow using the extension:

1. Install and configure (if required) the extension with your preferred alias.
2. Open the integrated terminal and execute commands using your alias (`art migrate`).


## Summary
The PHP Artisan Alias extension enhances your Laravel development experience in Visual Studio Code by streamlining Artisan commands with a customizable alias. This guide provides step-by-step instructions to help you install, configure, and effectively use the extension.

For further assistance or to report issues, visit the [GitHub repository](https://github.com/mbparvezme/php-artisan-alias) of the extension contact the publisher at [www.mbparvez.me](https://www.mbparvez.me).