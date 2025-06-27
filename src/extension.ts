import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

/**
 * This method is called when the extension is activated.
 * @param context - The context in which the extension is running.
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('PHP Artisan Alias extension activated');

	// Retrieve the alias from the configuration, defaulting to 'art'
	const config = vscode.workspace.getConfiguration('phpArtisanAlias');
	const alias = config.get<string>('alias') || 'art';
	console.log(`Alias set to: ${alias}`);

	/**
	 * Check if the current workspace contains a Laravel project.
	 * @returns {boolean} - True if a Laravel project is detected, false otherwise.
	 */
	const isLaravelProject = (): boolean => {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (workspaceFolders) {
			for (const folder of workspaceFolders) {
				const artisanPath = path.join(folder.uri.fsPath, 'artisan');
				if (fs.existsSync(artisanPath)) {
					return true;
				}
			}
		}
		return false;
	};

	/**
	 * Generate all the command aliases based on the platform and shell.
	 * @param shellPath - The detected shell path.
	 * @returns {string} - The alias commands string.
	 */
	const generateAliasCommands = (shellPath: string): string => {
		const aliases: string[] = [];

		// Main artisan alias
		aliases.push(`${alias}='php artisan'`);

		// Make commands: php artisan make:[X] => mk[X]
		const makeCommands = [
			'model', 'controller', 'view', 'middleware', 'provider', 'command', 
			'event', 'listener', 'mail', 'notification', 'policy', 'request', 
			'resource', 'rule', 'seeder', 'service', 'test', 'job', 'channel',
			'console', 'exception', 'factory', 'guard', 'migration', 'observer'
		];
		
		makeCommands.forEach(cmd => {
			aliases.push(`mk${cmd}='php artisan make:${cmd}'`);
		});

		// Direct commands: php artisan [X] => [X]
		const directCommands = [
			'migrate', 'down', 'up', 'serve', 'clear-compiled', 'config:clear',
			'config:cache', 'route:clear', 'view:clear', 'cache:clear', 'cache:forget',
			'config:show', 'route:show', 'view:show', 'cache:show', 'queue:clear',
			'queue:flush', 'queue:restart', 'queue:retry', 'queue:work', 'queue:listen',
			'queue:monitor', 'queue:prune-failed', 'queue:prune-batches', 'schedule:list',
			'schedule:run', 'schedule:test', 'schedule:work', 'vendor:publish', 'list'
		];

		directCommands.forEach(cmd => {
			aliases.push(`${cmd}='php artisan ${cmd}'`);
		});

		// DB commands: php artisan db:[X] => db[X]
		const dbCommands = [
			'monitor', 'seed', 'show', 'table', 'wipe', 'seed:class', 'seed:status'
		];

		dbCommands.forEach(cmd => {
			aliases.push(`db${cmd}='php artisan db:${cmd}'`);
		});

		// Migration commands: php artisan migrate:[X] => [X]
		const migrationCommands = [
			'fresh', 'install', 'refresh', 'reset', 'rollback', 'status'
		];

		migrationCommands.forEach(cmd => {
			aliases.push(`${cmd}='php artisan migrate:${cmd}'`);
		});

		// ENV commands
		aliases.push('envd=\'php artisan env:decrypt\'');
		aliases.push('enve=\'php artisan env:encrypt\'');

		// Mix commands
		aliases.push('routs=\'php artisan route:list\'');
		aliases.push('events=\'php artisan event:list\'');
		aliases.push('keygen=\'php artisan key:generate\'');
		aliases.push('lang=\'php artisan lang:publish\'');
		aliases.push('link=\'php artisan storage:link\'');
		aliases.push('unlink=\'php artisan storage:unlink\'');
		aliases.push('tinker=\'php artisan tinker\'');
		aliases.push('test=\'php artisan test\'');

		// Join all aliases
		return aliases.join(' && alias ');
	};

	/**
	 * Set the aliases in the given terminal.
	 * @param terminal - The terminal in which to set the aliases.
	 */
	const setAlias = (terminal: vscode.Terminal) => {
		if (isLaravelProject()) {
			setTimeout(() => {
				terminal.processId.then(pid => {
					if (pid) {
						const shellPath = vscode.env.shell;
						console.log(`Detected shell: ${shellPath}`);
						try {
							if (process.platform === 'win32') {
								if (shellPath.includes('powershell') || shellPath.includes('pwsh')) {
									// Use PowerShell to set the aliases
									const aliasCommands = generateAliasCommands(shellPath);
									const aliases = aliasCommands.split(' && alias ');
									
									// Create PowerShell functions for each alias
									aliases.forEach(aliasCmd => {
										if (aliasCmd.trim()) {
											const [aliasName, command] = aliasCmd.split('=');
											if (aliasName && command) {
												const cleanCommand = command.replace(/'/g, '');
												// Fix PowerShell function syntax
												terminal.sendText(`function ${aliasName.trim()} { & ${cleanCommand} $args }`);
											}
										}
									});
									
									terminal.sendText('cls');
									console.log('Aliases set for PowerShell');
								} else {
									// Handle cmd (not persistent)
									const aliasCommands = generateAliasCommands(shellPath);
									const aliases = aliasCommands.split(' && alias ');
									
									aliases.forEach(aliasCmd => {
										if (aliasCmd.trim()) {
											const [aliasName, command] = aliasCmd.split('=');
											if (aliasName && command) {
												const cleanCommand = command.replace(/'/g, '');
												terminal.sendText(`doskey ${aliasName.trim()}=${cleanCommand} $*`);
											}
										}
									});
									
									terminal.sendText('cls');
									console.log('Aliases set for cmd');
								}
							} else {
								// Handle other platforms (Linux, macOS)
								const aliasCommands = generateAliasCommands(shellPath);
								terminal.sendText(`alias ${aliasCommands} && clear`);
								console.log('Aliases set for Unix-like system');
							}
						} catch (error: unknown) {
							if (error instanceof Error) {
								vscode.window.showErrorMessage(`Error setting aliases: ${error.message}`);
								console.error(error);
							} else {
								vscode.window.showErrorMessage('Unknown error setting aliases');
								console.error('Unknown error setting aliases', error);
							}
						}
					}
				});
			}, 1000); // Delay to ensure terminal is ready
		} else {
			vscode.window.showInformationMessage('Not a Laravel project');
			console.log('Not a Laravel project');
		}
	};

	/**
	 * Set aliases in all existing terminals
	 */
	const setAliasesInAllTerminals = () => {
		if (isLaravelProject()) {
			vscode.window.terminals.forEach(terminal => {
				setAlias(terminal);
			});
		}
	};

	// Listen for terminal creation and set the aliases
	vscode.window.onDidOpenTerminal((terminal) => {
		setAlias(terminal);
	});

	// Set aliases in existing terminals when extension activates
	setAliasesInAllTerminals();

	// Command to manually set the aliases
	const disposable = vscode.commands.registerCommand('phpArtisanAlias.setAlias', () => {
		const terminal = vscode.window.createTerminal('PHP Artisan Alias');
		setAlias(terminal);
		terminal.show();
	});

	// Command to set aliases in all existing terminals
	const setAllAliasesDisposable = vscode.commands.registerCommand('phpArtisanAlias.setAllAliases', () => {
		setAliasesInAllTerminals();
		vscode.window.showInformationMessage('Aliases set in all terminals');
	});

	context.subscriptions.push(disposable, setAllAliasesDisposable);
}

/**
 * This method is called when the extension is deactivated.
 */
export function deactivate() { }
