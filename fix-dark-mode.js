// Script to add dark mode classes to all pages
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to add dark mode classes to a file
function addDarkModeClasses(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add dark mode classes to background colors
    content = content.replace(
      /className="([^"]*)(bg-white|bg-gray-50|bg-gray-100|bg-gray-200)([^"]*)"/g, 
      'className="$1$2 dark:bg-gray-800$3"'
    );
    
    // Add dark mode classes to text colors
    content = content.replace(
      /className="([^"]*)(text-black|text-gray-800|text-gray-900)([^"]*)"/g, 
      'className="$1$2 dark:text-gray-100$3"'
    );
    
    content = content.replace(
      /className="([^"]*)(text-gray-600|text-gray-700)([^"]*)"/g, 
      'className="$1$2 dark:text-gray-400$3"'
    );
    
    // Add dark mode classes to border colors
    content = content.replace(
      /className="([^"]*)(border-gray-100|border-gray-200|border-gray-300)([^"]*)"/g, 
      'className="$1$2 dark:border-gray-700$3"'
    );
    
    // Add transition classes for smooth theme changes
    content = content.replace(
      /className="([^"]*)(flex-1|main|section|div)([^"]*)"/g, 
      (match, p1, p2, p3) => {
        if (!match.includes('transition-colors')) {
          return `className="${p1}${p2}${p3} transition-colors duration-300"`;
        }
        return match;
      }
    );
    
    // Add dark mode to main elements
    content = content.replace(
      /<main className="([^"]*)flex-1([^"]*)"/g,
      '<main className="$1flex-1$2 dark:bg-gray-900 dark:text-gray-100"'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Find all TSX files in the app directory
const files = glob.sync('app/**/*.tsx');

// Process each file
files.forEach(addDarkModeClasses);

console.log('Dark mode classes added to all pages!'); 