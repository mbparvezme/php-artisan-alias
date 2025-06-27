# Change Log

All notable changes to the "php-artisan-alias" extension will be documented in this file.

## [0.12.0] - 2024-12-19

### Added
- **Comprehensive Command Aliases**: Added support for all common Laravel artisan commands
- **Make Commands**: All `php artisan make:[command]` commands now available as `mk[command]`
  - `mkmodel`, `mkcontroller`, `mkview`, `mkmiddleware`, `mkprovider`, `mkcommand`
  - `mkevent`, `mklistener`, `mkmail`, `mknotification`, `mkpolicy`, `mkrequest`
  - `mkresource`, `mkrule`, `mkseeder`, `mkservice`, `mktest`, `mkjob`
  - `mkchannel`, `mkconsole`, `mkexception`, `mkfactory`, `mkguard`, `mkmigration`, `mkobserver`
- **Direct Commands**: Common artisan commands without `php artisan` prefix
  - `migrate`, `down`, `up`, `serve`, `clear-compiled`, `config:clear`, `config:cache`
  - `route:clear`, `view:clear`, `cache:clear`, `cache:forget`, `config:show`, `route:show`
  - `view:show`, `cache:show`, `queue:clear`, `queue:flush`, `queue:restart`, `queue:retry`
  - `queue:work`, `queue:listen`, `queue:monitor`, `queue:prune-failed`, `queue:prune-batches`
  - `schedule:list`, `schedule:run`, `schedule:test`, `schedule:work`, `vendor:publish`, `list`
- **Database Commands**: All `php artisan db:[command]` commands as `db[command]`
  - `dbmonitor`, `dbseed`, `dbshow`, `dbtable`, `dbwipe`, `dbseed:class`, `dbseed:status`
- **Migration Commands**: All `php artisan migrate:[command]` commands directly
  - `fresh`, `install`, `refresh`, `reset`, `rollback`, `status`
- **Environment Commands**: `envd` and `enve` for env:decrypt and env:encrypt
- **Mixed Commands**: Short aliases for various artisan commands
  - `routs`, `events`, `keygen`, `lang`, `link`, `unlink`, `tinker`, `test`
- **Cross-Platform Support**: All aliases work on Windows (PowerShell/cmd) and Unix-like systems
- **Automatic Setup**: All aliases are automatically set when terminals are opened in Laravel projects

### Changed
- Updated extension description to reflect new comprehensive alias support
- Improved error handling for multiple alias setup
- Enhanced PowerShell and CMD support for multiple aliases

### Technical
- Refactored alias generation into a dedicated function for better maintainability
- Added support for parsing and setting multiple aliases across different shell types
- Improved terminal detection and alias application logic