import fs from 'fs';
import path from 'path';
function printTree(dir, indent = '') {
  const items = fs.readdirSync(dir);

  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isDir = fs.statSync(fullPath).isDirectory();
    const isLast = index === items.length - 1;

    const pointer = isLast ? '└── ' : '├── ';
    console.log(indent + pointer + item);

    if (isDir) {
      const nextIndent = indent + (isLast ? '    ' : '│   ');
      printTree(fullPath, nextIndent);
    }
  });
}

// Change this to your backend's src directory
const startDir = path.join(process.cwd(), 'src');

if (fs.existsSync(startDir)) {
  console.log('📁 Project Structure (from /src):\n');
  printTree(startDir);
} else {
  console.error('❌ src folder not found in current directory.');
}
