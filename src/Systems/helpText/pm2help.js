// Your JS file content
const pm2Help = `
# Ubuntu Terminal Tips and Tricks

## Basic Commands

pm2 start --name your-app-name npm -- start



### Navigate File System

- \`pwd\`: Print the current working directory.
- \`ls\`: List files and directories.
- \`cd\`: Change directory.
  - Example: \`cd Documents\`

### File Operations

- \`touch\`: Create an empty file.
  - Example: \`touch example.txt\`
- \`cp\`: Copy files or directories.
  - Example: \`cp file.txt /path/to/destination\`
- \`mv\`: Move or rename files.
  - Example: \`mv file.txt newfile.txt\`
- \`rm\`: Remove files or directories.
  - Example: \`rm file.txt\`

### Working with Text

- \`cat\`: Display file contents.
  - Example: \`cat file.txt\`
- \`nano\` or \`vim\`: Text editors for editing files.
  - Example: \`nano file.txt\`

## Advanced Commands

### System Information

- \`uname\`: Display system information.
  - Example: \`uname -a\`
- \`df\`: Show disk space usage.
  - Example: \`df -h\`

### Process Management

- \`ps\`: Display information about running processes.
  - Example: \`ps aux\`
- \`kill\`: Terminate a process by process ID.
  - Example: \`kill -9 <PID>\`

### Package Management

- \`sudo apt-get update\`: Update package lists.
- \`sudo apt-get upgrade\`: Upgrade installed packages.
- \`sudo apt-get install <package>\`: Install a new package.
- \`sudo apt-get remove <package>\`: Remove a package.

## Shortcuts

- \`Ctrl + C\`: Interrupt currently running process.
- \`Ctrl + D\`: Logout or exit the current shell.
- \`Ctrl + L\`: Clear the terminal screen.
- \`Tab\`: Auto-complete file and directory names.

## Wildcards

- \`*\`: Matches any sequence of characters.
  - Example: \`ls *.txt\` lists all text files.

## File Permissions

- \`chmod\`: Change file permissions.
  - Example: \`chmod +x script.sh\` makes a script executable.

## Miscellaneous Tips

- Use \`man\` command for manual pages.
  - Example: \`man ls\` for information about the \`ls\` command.
- Use \`history\` to view command history.
- Customize the terminal prompt in the \`.bashrc\` file.

Remember to explore and experiment with these commands in a safe environment before using them extensively.
`;

export default pm2Help;
