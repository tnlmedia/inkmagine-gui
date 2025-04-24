export const setFont = (userLanguage = 'en-us') => {
  document.documentElement.lang =  userLanguage;
  // add google font
  let fontStyleLink = document.createElement('link');
  fontStyleLink.rel = 'stylesheet';
  if (userLanguage === 'zh-tw') {
    fontStyleLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400..700&display=swap'
  } else if (userLanguage === 'ja-jp') {
    fontStyleLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400..700&display=swap';
  } else {
  }
  document.head.appendChild(fontStyleLink);
}