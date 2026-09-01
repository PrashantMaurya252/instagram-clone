const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    const dirent = fs.statSync(dirFile);
    if (dirent.isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.js') || dirFile.endsWith('.jsx') || dirFile.endsWith('.ts') || dirFile.endsWith('.tsx')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
}

const files = walkSync(srcDir);
const TARGET_URL = 'https://instagram-clone-awa2.onrender.com';

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  if (content.includes(TARGET_URL)) {
    // We only care about axios or fetch, but let's replace axios calls
    
    // Replace import
    if (content.includes('import axios from')) {
       // Just replace axios import with api import
       content = content.replace(/import axios from ['"]axios['"];?/, 'import api from "@/lib/api";');
    } else if (content.includes('axios.')) {
       // If axios is used but no import found (unlikely, but just in case), prepend
       if (!content.includes('import api from')) {
           content = 'import api from "@/lib/api";\n' + content;
       }
    }

    // Replace axios.[method]('https://.../path') with api.[method]('/path')
    const regex = new RegExp(`axios\\.(get|post|put|delete|patch)\\(\\s*(['"\`])${TARGET_URL.replace(/\//g, '\\/')}`, 'g');
    content = content.replace(regex, 'api.$1($2');

    // What if they passed the URL without axios.? (Like fetch)
    const fetchRegex = new RegExp(`fetch\\(\\s*(['"\`])${TARGET_URL.replace(/\//g, '\\/')}`, 'g');
    content = content.replace(fetchRegex, 'fetch($1');

    // What about socket.io in App.jsx?
    // User requested: "where eveer I called api using axios or fetch"
    // Let's also export BACKEND_URL in lib/api.js and use it in App.jsx just to be helpful, 
    // or we can just leave socket.io alone if it's not axios/fetch. 
    // Let's leave socket io alone for now.
    
    // Fix remaining template string URLs where the URL is embedded
    // e.g., \`https://instagram-clone-awa2.onrender.com/api/v1/user/followorunfollow/\${userId}\`
    // but the regex above already catches axios.post(\`https://...
    
    // Sometimes the URL might be on a new line or not directly in axios.get(
    // e.g. let url = 'https://...'; axios.get(url)
    // The previous regex handles `axios.get('https://...` directly.
    // For anything else, we can just replace the TARGET_URL with empty string if it's inside an api. call?
    // Let's just do a generic replacement for the URL if it's left over:
    // But ONLY if we replaced something, to avoid messing up things like socket.io if we don't want to.
    
    if (content !== originalContent) {
       // Also replace any leftover exact target url with '' just in case it was used in a variable
       // wait, no, that might break something. Let's see if there are any leftovers.
       // E.g. in SuggestedUser.jsx:
       // axios.post(
       //   `https://instagram-clone-awa2.onrender.com/api/v1/user/followorunfollow/${userId}`, ...
       // )
       // Our regex handles this because it has \s*
       
       fs.writeFileSync(file, content, 'utf8');
       console.log('Updated', file);
    }
  }
});
