(function(){
  try {
    // Only set light mode if no theme is already stored
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      // Apply the stored theme
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark') {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    }
  } catch(e) {
    console.error('Error handling theme:', e);
  }
})()
