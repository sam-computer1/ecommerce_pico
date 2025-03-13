// Script to fix dark mode issues in all pages
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all files that need fixing
const filesToFix = execSync('find app -name "*.tsx" -type f')
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

console.log(`Found ${filesToFix.length} files to check:`);

// Function to fix dark mode issues
function fixDarkMode(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix duplicate dark mode classes
    content = content.replace(/dark:bg-gray-\d{3} dark:bg-gray-\d{3}/g, (match) => {
      return match.split(' ')[0];
    });
    
    content = content.replace(/dark:text-gray-\d{3} dark:text-gray-\d{3}/g, (match) => {
      return match.split(' ')[0];
    });
    
    content = content.replace(/transition-colors duration-300 transition-colors duration-300/g, 'transition-colors duration-300');
    
    // Fix main elements
    content = content.replace(
      /<main className="([^"]*)bg-white([^"]*)"/g,
      '<main className="$1bg-white dark:bg-gray-900$2 transition-colors duration-300"'
    );
    
    content = content.replace(
      /<main className="([^"]*)bg-gray-50([^"]*)"/g,
      '<main className="$1bg-gray-50 dark:bg-gray-900$2 transition-colors duration-300"'
    );
    
    // Fix div elements with bg-white
    content = content.replace(
      /<div className="([^"]*)bg-white([^"]*)"([^>]*)>/g,
      (match, p1, p2, p3) => {
        if (!match.includes('dark:bg-gray')) {
          return `<div className="${p1}bg-white${p2} dark:bg-gray-800"${p3}>`;
        }
        return match;
      }
    );
    
    // Fix div elements with bg-gray-50
    content = content.replace(
      /<div className="([^"]*)bg-gray-50([^"]*)"([^>]*)>/g,
      (match, p1, p2, p3) => {
        if (!match.includes('dark:bg-gray')) {
          return `<div className="${p1}bg-gray-50${p2} dark:bg-gray-900"${p3}>`;
        }
        return match;
      }
    );
    
    // Fix div elements with bg-gray-100
    content = content.replace(
      /<div className="([^"]*)bg-gray-100([^"]*)"([^>]*)>/g,
      (match, p1, p2, p3) => {
        if (!match.includes('dark:bg-gray')) {
          return `<div className="${p1}bg-gray-100${p2} dark:bg-gray-800"${p3}>`;
        }
        return match;
      }
    );
    
    // Fix div elements with bg-gray-200
    content = content.replace(
      /<div className="([^"]*)bg-gray-200([^"]*)"([^>]*)>/g,
      (match, p1, p2, p3) => {
        if (!match.includes('dark:bg-gray')) {
          return `<div className="${p1}bg-gray-200${p2} dark:bg-gray-700"${p3}>`;
        }
        return match;
      }
    );
    
    // Only write if changes were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Process each file
let updatedCount = 0;
filesToFix.forEach(filePath => {
  if (fixDarkMode(filePath)) {
    updatedCount++;
  }
});

console.log(`Fixed dark mode issues in ${updatedCount} files!`); 