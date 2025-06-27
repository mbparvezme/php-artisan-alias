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
	 * Get all available aliases for the help command
	 */
	const getAllAliases = () => {
		const aliases: { alias: string; command: string; description: string; category: string }[] = [];

		// Main artisan alias
		aliases.push({
			alias: alias,
			command: 'php artisan',
			description: 'Main artisan command',
			category: 'Main'
		});

		// Make commands
		const makeCommands = [
			{ name: 'model', desc: 'Create a new model' },
			{ name: 'controller', desc: 'Create a new controller' },
			{ name: 'view', desc: 'Create a new view' },
			{ name: 'middleware', desc: 'Create a new middleware' },
			{ name: 'provider', desc: 'Create a new service provider' },
			{ name: 'command', desc: 'Create a new command' },
			{ name: 'event', desc: 'Create a new event' },
			{ name: 'listener', desc: 'Create a new listener' },
			{ name: 'mail', desc: 'Create a new mail class' },
			{ name: 'notification', desc: 'Create a new notification' },
			{ name: 'policy', desc: 'Create a new policy' },
			{ name: 'request', desc: 'Create a new form request' },
			{ name: 'resource', desc: 'Create a new resource' },
			{ name: 'rule', desc: 'Create a new validation rule' },
			{ name: 'seeder', desc: 'Create a new seeder' },
			{ name: 'service', desc: 'Create a new service class' },
			{ name: 'test', desc: 'Create a new test' },
			{ name: 'job', desc: 'Create a new job' },
			{ name: 'channel', desc: 'Create a new broadcasting channel' },
			{ name: 'console', desc: 'Create a new console command' },
			{ name: 'exception', desc: 'Create a new exception' },
			{ name: 'factory', desc: 'Create a new model factory' },
			{ name: 'guard', desc: 'Create a new authentication guard' },
			{ name: 'migration', desc: 'Create a new migration' },
			{ name: 'observer', desc: 'Create a new model observer' }
		];

		makeCommands.forEach(cmd => {
			aliases.push({
				alias: `mk${cmd.name}`,
				command: `php artisan make:${cmd.name}`,
				description: cmd.desc,
				category: 'Make Commands'
			});
		});

		// Direct commands
		const directCommands = [
			{ name: 'migrate', desc: 'Run database migrations' },
			{ name: 'down', desc: 'Put application in maintenance mode' },
			{ name: 'up', desc: 'Bring application out of maintenance mode' },
			{ name: 'serve', desc: 'Start development server' },
			{ name: 'clear-compiled', desc: 'Clear compiled classes' },
			{ name: 'config:clear', desc: 'Clear configuration cache' },
			{ name: 'config:cache', desc: 'Cache configuration files' },
			{ name: 'route:clear', desc: 'Clear route cache' },
			{ name: 'view:clear', desc: 'Clear view cache' },
			{ name: 'cache:clear', desc: 'Clear application cache' },
			{ name: 'cache:forget', desc: 'Remove item from cache' },
			{ name: 'config:show', desc: 'Show configuration values' },
			{ name: 'route:show', desc: 'Show route information' },
			{ name: 'view:show', desc: 'Show view information' },
			{ name: 'cache:show', desc: 'Show cache information' },
			{ name: 'queue:clear', desc: 'Clear all queued jobs' },
			{ name: 'queue:flush', desc: 'Flush failed queue jobs' },
			{ name: 'queue:restart', desc: 'Restart queue worker daemons' },
			{ name: 'queue:retry', desc: 'Retry a failed queue job' },
			{ name: 'queue:work', desc: 'Start processing jobs on the queue' },
			{ name: 'queue:listen', desc: 'Listen to a given queue' },
			{ name: 'queue:monitor', desc: 'Monitor queue sizes' },
			{ name: 'queue:prune-failed', desc: 'Prune stale entries from failed jobs table' },
			{ name: 'queue:prune-batches', desc: 'Prune stale entries from batches table' },
			{ name: 'schedule:list', desc: 'List scheduled commands' },
			{ name: 'schedule:run', desc: 'Run scheduled commands' },
			{ name: 'schedule:test', desc: 'Test scheduled commands' },
			{ name: 'schedule:work', desc: 'Start the schedule worker' },
			{ name: 'vendor:publish', desc: 'Publish vendor assets' },
			{ name: 'list', desc: 'List all commands' }
		];

		directCommands.forEach(cmd => {
			aliases.push({
				alias: cmd.name,
				command: `php artisan ${cmd.name}`,
				description: cmd.desc,
				category: 'Direct Commands'
			});
		});

		// DB commands
		const dbCommands = [
			{ name: 'monitor', desc: 'Monitor database queries' },
			{ name: 'seed', desc: 'Seed the database' },
			{ name: 'show', desc: 'Show database information' },
			{ name: 'table', desc: 'Show table information' },
			{ name: 'wipe', desc: 'Wipe all tables' },
			{ name: 'seed:class', desc: 'Seed database with specific class' },
			{ name: 'seed:status', desc: 'Show seeder status' }
		];

		dbCommands.forEach(cmd => {
			aliases.push({
				alias: `db${cmd.name}`,
				command: `php artisan db:${cmd.name}`,
				description: cmd.desc,
				category: 'Database Commands'
			});
		});

		// Migration commands
		const migrationCommands = [
			{ name: 'fresh', desc: 'Fresh migration with seed' },
			{ name: 'install', desc: 'Install migration repository' },
			{ name: 'refresh', desc: 'Refresh migrations' },
			{ name: 'reset', desc: 'Reset migrations' },
			{ name: 'rollback', desc: 'Rollback last migration' },
			{ name: 'status', desc: 'Show migration status' }
		];

		migrationCommands.forEach(cmd => {
			aliases.push({
				alias: cmd.name,
				command: `php artisan migrate:${cmd.name}`,
				description: cmd.desc,
				category: 'Migration Commands'
			});
		});

		// Environment commands
		aliases.push({
			alias: 'envd',
			command: 'php artisan env:decrypt',
			description: 'Decrypt environment file',
			category: 'Environment Commands'
		});

		aliases.push({
			alias: 'enve',
			command: 'php artisan env:encrypt',
			description: 'Encrypt environment file',
			category: 'Environment Commands'
		});

		// Mixed commands
		const mixedCommands = [
			{ alias: 'routs', command: 'route:list', desc: 'List all routes' },
			{ alias: 'events', command: 'event:list', desc: 'List all events' },
			{ alias: 'keygen', command: 'key:generate', desc: 'Generate application key' },
			{ alias: 'lang', command: 'lang:publish', desc: 'Publish language files' },
			{ alias: 'link', command: 'storage:link', desc: 'Create storage link' },
			{ alias: 'unlink', command: 'storage:unlink', desc: 'Remove storage link' },
			{ alias: 'tinker', command: 'tinker', desc: 'Start Laravel Tinker' },
			{ alias: 'test', command: 'test', desc: 'Run tests' }
		];

		mixedCommands.forEach(cmd => {
			aliases.push({
				alias: cmd.alias,
				command: `php artisan ${cmd.command}`,
				description: cmd.desc,
				category: 'Mixed Commands'
			});
		});

		return aliases;
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

	// Help command to list all aliases
	const helpDisposable = vscode.commands.registerCommand('phpArtisanAlias.help', () => {
		if (!isLaravelProject()) {
			vscode.window.showInformationMessage('Not a Laravel project');
			return;
		}

		const aliases = getAllAliases();
		const categories = [...new Set(aliases.map(a => a.category))];
		
		// Create webview panel
		const panel = vscode.window.createWebviewPanel(
			'phpArtisanHelp',
			'PHP Artisan Aliases Help',
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				retainContextWhenHidden: true
			}
		);

		// Generate HTML content
		let htmlContent = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>PHP Artisan Aliases Help</title>
			<style>
				body {
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
					line-height: 1.6;
					color: var(--vscode-foreground);
					background-color: var(--vscode-editor-background);
					padding: 20px;
					max-width: 800px;
					margin: 0 auto;
				}
				h1 {
					color: var(--vscode-textLink-foreground);
					border-bottom: 2px solid var(--vscode-textLink-foreground);
					padding-bottom: 10px;
				}
				h2 {
					color: var(--vscode-textLink-foreground);
					margin-top: 30px;
					margin-bottom: 15px;
				}
				.main-alias {
					background-color: var(--vscode-textBlockQuote-background);
					border-left: 4px solid var(--vscode-textLink-foreground);
					padding: 15px;
					margin: 20px 0;
					border-radius: 4px;
				}
				.command-list {
					background-color: var(--vscode-editor-background);
					border: 1px solid var(--vscode-panel-border);
					border-radius: 4px;
					padding: 15px;
					margin: 10px 0;
				}
				.command-item {
					margin: 8px 0;
					padding: 8px;
					border-radius: 4px;
					background-color: var(--vscode-textBlockQuote-background);
				}
				.alias {
					font-family: 'Courier New', monospace;
					font-weight: bold;
					color: var(--vscode-textLink-foreground);
				}
				.command {
					font-family: 'Courier New', monospace;
					color: var(--vscode-textPreformat-foreground);
				}
				.description {
					color: var(--vscode-descriptionForeground);
					font-style: italic;
				}
				.category {
					font-weight: bold;
					color: var(--vscode-textLink-foreground);
					margin-bottom: 10px;
				}
			</style>
		</head>
		<body>
			<h1>🚀 PHP Artisan Aliases</h1>
			
			<div class="main-alias">
				<strong>Main Alias:</strong> <span class="alias">${alias}</span> → <span class="command">php artisan</span>
			</div>
		`;

		categories.forEach(category => {
			htmlContent += `<h2>${category}</h2>`;
			const categoryAliases = aliases.filter(a => a.category === category);
			
			htmlContent += '<div class="command-list">';
			categoryAliases.forEach(aliasInfo => {
				htmlContent += `
					<div class="command-item">
						<span class="alias">${aliasInfo.alias}</span> → <span class="command">${aliasInfo.command}</span>
						<div class="description">${aliasInfo.description}</div>
					</div>
				`;
			});
			htmlContent += '</div>';
		});

		htmlContent += `
		</body>
		</html>
		`;

		panel.webview.html = htmlContent;
	});

	// Serve command with keyboard shortcut
	const serveDisposable = vscode.commands.registerCommand('phpArtisanAlias.serve', () => {
		console.log('Serve command triggered!');
		
		if (!isLaravelProject()) {
			vscode.window.showInformationMessage('Not a Laravel project');
			console.log('Not a Laravel project - serve command cancelled');
			return;
		}

		console.log('Laravel project detected, starting server...');
		const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('Laravel Serve');
		terminal.sendText('php artisan serve');
		terminal.show();
		vscode.window.showInformationMessage('Starting Laravel development server...');
		console.log('Laravel serve command executed successfully');
	});

	context.subscriptions.push(
		disposable, 
		setAllAliasesDisposable, 
		helpDisposable, 
		serveDisposable
	);
}

/**
 * This method is called when the extension is deactivated.
 */
export function deactivate() { }
