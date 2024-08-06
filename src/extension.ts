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
	 * Set the alias in the given terminal.
	 * @param terminal - The terminal in which to set the alias.
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
									// Use PowerShell to set the alias
									terminal.sendText(`function ${alias} { php artisan $args }; cls`);
									console.log('Alias set for PowerShell');
								} else {
									// Handle cmd (not persistent)
									terminal.sendText(`doskey ${alias}=php artisan $* && cls`);
									console.log('Alias set for cmd');
								}
							} else {
								// Handle other platforms (Linux, macOS)
								terminal.sendText(`alias ${alias}='php artisan' && cls`);
								console.log('Alias set for Unix-like system');
							}
						} catch (error: unknown) {
							if (error instanceof Error) {
								vscode.window.showErrorMessage(`Error setting alias: ${error.message}`);
								console.error(error);
							} else {
								vscode.window.showErrorMessage('Unknown error setting alias');
								console.error('Unknown error setting alias', error);
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

	// Listen for terminal creation and set the alias
	vscode.window.onDidOpenTerminal((terminal) => {
		setAlias(terminal);
	});

	// Command to manually set the alias
	const disposable = vscode.commands.registerCommand('phpArtisanAlias.setAlias', () => {
		const terminal = vscode.window.createTerminal('PHP Artisan Alias');
		setAlias(terminal);
		terminal.show();
	});

	context.subscriptions.push(disposable);
}

/**
 * This method is called when the extension is deactivated.
 */
export function deactivate() { }
