// Script to fix duplicate dark mode classes
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all files that need fixing
const filesToFix = execSync('find app -name "*.tsx" -type f')
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

console.log(`Found ${filesToFix.length} files to check for duplicates:`);

// Function to fix duplicate dark mode classes
function fixDuplicateClasses(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Fix duplicate dark mode classes
    content = content.replace(/dark:bg-gray-800 dark:bg-gray-800/g, 'dark:bg-gray-800');
    content = content.replace(/dark:bg-gray-900 dark:bg-gray-900/g, 'dark:bg-gray-900');
    content = content.replace(/dark:bg-gray-700 dark:bg-gray-700/g, 'dark:bg-gray-700');
    content = content.replace(/dark:text-gray-100 dark:text-gray-100/g, 'dark:text-gray-100');
    content = content.replace(/dark:text-gray-200 dark:text-gray-200/g, 'dark:text-gray-200');
    content = content.replace(/dark:text-gray-300 dark:text-gray-300/g, 'dark:text-gray-300');
    content = content.replace(/dark:text-gray-400 dark:text-gray-400/g, 'dark:text-gray-400');
    content = content.replace(/dark:border-gray-700 dark:border-gray-700/g, 'dark:border-gray-700');
    content = content.replace(/dark:border-gray-800 dark:border-gray-800/g, 'dark:border-gray-800');
    content = content.replace(/transition-colors duration-300 transition-colors duration-300/g, 'transition-colors duration-300');
    
    // Fix multiple dark mode text classes
    content = content.replace(/dark:text-gray-300 dark:text-gray-400/g, 'dark:text-gray-400');
    content = content.replace(/dark:text-gray-400 dark:text-gray-300/g, 'dark:text-gray-300');
    
    // Fix multiple dark mode bg classes
    content = content.replace(/dark:bg-gray-800 dark:bg-gray-700/g, 'dark:bg-gray-800');
    content = content.replace(/dark:bg-gray-700 dark:bg-gray-800/g, 'dark:bg-gray-700');
    content = content.replace(/dark:bg-gray-900 dark:bg-gray-800/g, 'dark:bg-gray-900');
    content = content.replace(/dark:bg-gray-800 dark:bg-gray-900/g, 'dark:bg-gray-800');
    
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
  if (fixDuplicateClasses(filePath)) {
    updatedCount++;
  }
});

console.log(`Fixed duplicate dark mode classes in ${updatedCount} files!`); 