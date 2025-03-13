// Script to add dark mode classes to all pages
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all files that need fixing
const filesToFix = execSync('find app -name "*.tsx" -type f -exec grep -l "bg-white\\|bg-gray-50" {} \\; | xargs grep -l -v "dark:bg-gray"')
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean); // Filter out empty strings

console.log(`Found ${filesToFix.length} files to fix:`);
console.log(filesToFix.join('\n'));

// Function to add dark mode classes to a file
function addDarkModeClasses(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Function to add dark mode class if it doesn't already exist
    const addDarkClass = (match, p1, p2, p3, darkClass) => {
      if (!match.includes(darkClass)) {
        return `className="${p1}${p2}${p3} ${darkClass}"`;
      }
      return match;
    };
    
    // Add dark mode classes to background colors
    content = content.replace(
      /className="([^"]*)(bg-white)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:bg-gray-800')
    );
    
    content = content.replace(
      /className="([^"]*)(bg-gray-50)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:bg-gray-900')
    );
    
    content = content.replace(
      /className="([^"]*)(bg-gray-100)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:bg-gray-800')
    );
    
    content = content.replace(
      /className="([^"]*)(bg-gray-200)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:bg-gray-700')
    );
    
    // Add dark mode classes to text colors
    content = content.replace(
      /className="([^"]*)(text-black)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:text-white')
    );
    
    content = content.replace(
      /className="([^"]*)(text-gray-800)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:text-gray-200')
    );
    
    content = content.replace(
      /className="([^"]*)(text-gray-900)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:text-gray-100')
    );
    
    content = content.replace(
      /className="([^"]*)(text-gray-600)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:text-gray-300')
    );
    
    content = content.replace(
      /className="([^"]*)(text-gray-700)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:text-gray-300')
    );
    
    content = content.replace(
      /className="([^"]*)(text-gray-500)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:text-gray-400')
    );
    
    // Add dark mode classes to border colors
    content = content.replace(
      /className="([^"]*)(border-gray-100)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:border-gray-800')
    );
    
    content = content.replace(
      /className="([^"]*)(border-gray-200)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:border-gray-700')
    );
    
    content = content.replace(
      /className="([^"]*)(border-gray-300)([^"]*)"/g, 
      (match, p1, p2, p3) => addDarkClass(match, p1, p2, p3, 'dark:border-gray-700')
    );
    
    // Add transition classes for smooth theme changes if they don't exist
    content = content.replace(
      /<main className="([^"]*)"([^>]*)>/g,
      (match, classes, rest) => {
        if (!classes.includes('transition-colors')) {
          return `<main className="${classes} transition-colors duration-300"${rest}>`;
        }
        return match;
      }
    );
    
    // Add dark mode to main elements if they don't already have it
    content = content.replace(
      /<main className="([^"]*)flex-1([^"]*)"([^>]*)>/g,
      (match, p1, p2, p3) => {
        if (!match.includes('dark:bg-gray')) {
          return `<main className="${p1}flex-1${p2} dark:bg-gray-900 dark:text-gray-100"${p3}>`;
        }
        return match;
      }
    );
    
    // Clean up duplicate dark mode classes
    content = content.replace(/dark:bg-gray-800 dark:bg-gray-800/g, 'dark:bg-gray-800');
    content = content.replace(/dark:bg-gray-900 dark:bg-gray-900/g, 'dark:bg-gray-900');
    content = content.replace(/dark:text-gray-100 dark:text-gray-100/g, 'dark:text-gray-100');
    content = content.replace(/dark:text-gray-200 dark:text-gray-200/g, 'dark:text-gray-200');
    content = content.replace(/dark:text-gray-300 dark:text-gray-300/g, 'dark:text-gray-300');
    content = content.replace(/dark:text-gray-400 dark:text-gray-400/g, 'dark:text-gray-400');
    content = content.replace(/transition-colors duration-300 transition-colors duration-300/g, 'transition-colors duration-300');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Process each file
filesToFix.forEach(addDarkModeClasses);

console.log('Dark mode classes added to all pages!'); 