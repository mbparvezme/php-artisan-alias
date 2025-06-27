# PHP Artisan Alias

> VS Code extension for Laravel developers - Set custom aliases for `php artisan` commands.

## Quick Start

1. Install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=mbparvezme.php-artisan-alias)
2. Open a Laravel project in VS Code
3. Open a terminal - aliases are set automatically!

## Available Aliases

### Main Alias
```sh
art serve          # php artisan serve
art migrate        # php artisan migrate
```

### Make Commands → `mk[command]`
```sh
mkmodel User       # php artisan make:model User
mkcontroller User  # php artisan make:controller User
mkview welcome     # php artisan make:view welcome
# ... all make: commands work with mk prefix
```

### Direct Commands → Just the command
```sh
migrate            # php artisan migrate
serve              # php artisan serve
down               # php artisan down
up                 # php artisan up
fresh              # php artisan migrate:fresh
rollback           # php artisan migrate:rollback
tinker             # php artisan tinker
test               # php artisan test
```

### Database Commands → `db[command]`
```sh
dbseed             # php artisan db:seed
dbwipe             # php artisan db:wipe
dbmonitor          # php artisan db:monitor
```

### Quick Commands
```sh
routs              # php artisan route:list
keygen             # php artisan key:generate
link               # php artisan storage:link
envd               # php artisan env:decrypt
enve               # php artisan env:encrypt
```

## Commands & Shortcuts

### Help Command
View all available aliases and their descriptions:
- **Command Palette**: `Ctrl+Shift+P` → "Show PHP Artisan Aliases Help"
- **Terminal**: `help` (if you set up the alias)

### Keyboard Shortcuts
- **Start Laravel Server**: `Ctrl+Alt+S` (anywhere in Laravel project)
- **Show Help**: `Ctrl+Shift+P` → "Show PHP Artisan Aliases Help"

## Configuration

**Change main alias** in VS Code settings:
```json
"phpArtisanAlias.alias": "laravel"
```

**Customize serve shortcut** in VS Code settings:
```json
"phpArtisanAlias.serveShortcut": "ctrl+alt+s"
```

**Manual setup**: Press `Ctrl+Shift+P` → "Set PHP Artisan Aliases in All Terminals"

## Patterns to Remember

### **Make Commands** → `mk[command]`
**Rule**: Add `mk` prefix to any `make:` command
```sh
php artisan make:model User      → mkmodel User
php artisan make:controller User → mkcontroller User
php artisan make:view welcome    → mkview welcome
```
**💡 Memory**: Think "**M**a**K**e" = `mk`

### **Database Commands** → `db[command]`
**Rule**: Add `db` prefix to any `db:` command
```sh
php artisan db:seed    → dbseed
php artisan db:wipe    → dbwipe
php artisan db:monitor → dbmonitor
```
**💡 Memory**: Think "**D**ata**B**ase" = `db`

### **Common Commands** → Just the command name
**Rule**: Remove `php artisan` prefix completely
```sh
php artisan migrate → migrate
php artisan serve   → serve
php artisan down    → down
php artisan up      → up
php artisan tinker  → tinker
php artisan test    → test
```
**💡 Memory**: Most used commands get shortest aliases

### **Migration Commands** → Action name only
**Rule**: Remove `php artisan migrate:` prefix
```sh
php artisan migrate:fresh   → fresh
php artisan migrate:rollback → rollback
php artisan migrate:status  → status
```
**💡 Memory**: Migration actions are so common, just use the action

### **Quick Shortcuts** → Intuitive abbreviations
**Rule**: Use logical shortcuts for specific commands
```sh
php artisan route:list     → routs (route + s)
php artisan key:generate   → keygen (key + gen)
php artisan storage:link   → link (just the action)
php artisan env:decrypt    → envd (env + d)
php artisan env:encrypt    → enve (env + e)
```
**💡 Memory**: Use the most distinctive part of the command

## Daily Workflow

```sh
serve              # Start server
mkmigration create_users
migrate            # Run migration
mkmodel User       # Create model
dbseed             # Seed database
tinker             # Test models
test               # Run tests
```

---

**Developer**: [M B Parvez](https://www.mbparvez.me) | **Support**: [TheUI](https://www.theui.dev) | **License**: MIT