// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// extension.ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('PHP Artisan Alias extension is now active!');

	const setAlias = (terminal: vscode.Terminal) => {
		const alias = vscode.workspace.getConfiguration('phpArtisanAlias').get<string>('alias') || 'art';
		console.log(`Setting alias to: ${alias}`);

		const shellConfig = vscode.workspace.getConfiguration('terminal.integrated.shell');

		try {
			if (process.platform === 'win32') {
				const shellPath = shellConfig.get<string>('windows');
				console.log(`Shell path: ${shellPath}`);
				if (shellPath && shellPath.toLowerCase().includes('powershell')) {
					terminal.sendText(`function ${alias} { php artisan $args }`);
				} else {
					terminal.sendText(`doskey ${alias}=php artisan $*`);
				}
			} else {
				terminal.sendText(`alias ${alias}='php artisan'`);
			}
		} catch (error) {
			if (error instanceof Error) {
				vscode.window.showErrorMessage(`Failed to set alias: ${error.message}`);
			} else {
				vscode.window.showErrorMessage(`Failed to set alias due to an unknown error`);
			}
		}
	};

	vscode.window.onDidOpenTerminal((terminal) => {
		setAlias(terminal);
	});

	let disposable = vscode.commands.registerCommand('extension.setAlias', () => {
		const terminal = vscode.window.createTerminal(`PHP Artisan Alias`);
		setAlias(terminal);
		terminal.show();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
