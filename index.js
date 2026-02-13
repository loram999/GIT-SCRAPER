const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: '/tmp/uploads/' });
const userDBPath = path.join('/tmp', 'users.json');
const ADMIN_ID = 993075735;

// Initialize users.json
if (!fs.existsSync('/tmp')) fs.mkdirSync('/tmp');
if (!fs.existsSync(userDBPath)) fs.writeJsonSync(userDBPath, {});

// Helper function to save user
function saveUser(id) {
  const db = fs.readJsonSync(userDBPath);
  db[id] = true;
  fs.writeJsonSync(userDBPath, db);
}

// Bypass script template
const getBypassScript = () => `
const axios = require("axios");
const chalk = require("chalk");

function requestInterceptor(cfg) {
  const urlTarget = cfg.url;
  const domainGithub = [
    "github.com",
    "raw.githubusercontent.com",
    "api.github.com",
  ];
  const isGitUrl = domainGithub.some((domain) => urlTarget.includes(domain));
  if (isGitUrl) {
    console.warn(
      chalk.blue(\`
█▀▄ █░█ █▀▄ ▄▀▄ ▄▀▀
█▀█ ▀▄▀ █▄█ █▀█ ░▀▄
▀▀░ ░▀░ ▀░░ ▀░▀ ▀▀░
▄▀▀░ █░█ ▀▀▀█ █▀ █▄░█
█░▀▌ ▀▄▀ ░▄▀░ █▀ █░▀█
▀▀▀░ ░▀░ ▀▀▀▀ ▀▀ ▀░░▀\`) +
        chalk.green("\\n]|• 𝙶𝙸𝚃𝙷𝚄𝙱 𝚁𝙰𝚆 ::" + urlTarget)
    );
  }
  return cfg;
}

function errorInterceptor(error) {
  const nihUrlKlwError = error?.config?.url || "URL TIDAK DIKETAHUI";
  console.error(
    chalk.green("𝗙𝗔𝗜𝗟𝗘𝗗 𝗧𝗢 𝗔𝗖𝗖𝗘𝗦𝗦: " + nihUrlKlwError)
  );
  return Promise.reject(error);
}

axios.interceptors.request.use(requestInterceptor, errorInterceptor);

const originalExit = process.exit;
process.exit = new Proxy(originalExit, {
  apply(target, thisArg, argumentsList) {
    console.log(chalk.blue("BYPASS TELAH AKTIF"));
  },
});

const originalKill = process.kill;
process.kill = function (pid, signal) {
  if (pid === process.pid) {
    console.log(chalk.blue("BYPASS TELAH AKTIF"));
  } else {
    return originalKill(pid, signal);
  }
};

["SIGINT", "SIGTERM", "SIGHUP"].forEach((signal) => {
  process.on(signal, () => {
    console.log(chalk.red("SINYAL " + signal + " TERDETEKSI DAN DIABAIKAN"));
  });
});

function vvvvvvv2(cfg) {
  const urlTarget = cfg.url;
  const domainGithub = [
    "github.com",
    "raw.githubusercontent.com",
    "api.github.com",
  ];
  const isGitUrl = domainGithub.some((domain) => urlTarget.includes(domain));
  if (isGitUrl) {
    console.warn(
     chalk.green("\\n ]|• 𝙶𝙸𝚃𝙷𝚄𝙱 𝚁𝙰𝚆 ::" + urlTarget)
    );
  }
  return cfg;
}

function startProgressBar() {
    const progressSteps = [
        "[■□□□□□□□□□□□□□□□□□□□□□□□□□□□□]",
        "[■■■□□□□□□□□□□□□□□□□□□□□□□□□□□]",
        "[■■■■■□□□□□□□□□□□□□□□□□□□□□□□□]",
        "[■■■■■■■□□□□□□□□□□□□□□□□□□□□□□]",
        "[■■■■■■■■■□□□□□□□□□□□□□□□□□□□□]",
        "[■■■■■■■■■■■□□□□□□□□□□□□□□□□□□]",
        "[■■■■■■■■■■■■■□□□□□□□□□□□□□□□□]",
        "[■■■■■■■■■■■■■■■□□□□□□□□□□□□□□]",
        "[■■■■■■■■■■■■■■■■■□□□□□□□□□□□□]",
        "[■■■■■■■■■■■■■■■■■■■□□□□□□□□□□]",
        "[■■■■■■■■■■■■■■■■■■■■■□□□□□□□□]",
        "[■■■■■■■■■■■■■■■■■■■■■■■□□□□□□]",
        "[■■■■■■■■■■■■■■■■■■■■■■■■■□□□□]",
        "[■■■■■■■■■■■■■■■■■■■■■■■■■■■□□]",
        "[■■■■■■■■■■■■■■■■■■■■■■■■■■■■■]",
        "[■■■■■■■■■■■■■■■■■■■■■■■■■■■□□]",
        "[■■■■■■■■■■■■■■■■■■■■■■■■■□□□□]",
        "[■■■■■■■■■■■■■■■■■■■■■■■□□□□□□]",
        "[■■■■■■■■■■■■■■■■■■■■■□□□□□□□□]",
        "[■■■■■■■■■■■■■■■■■■■□□□□□□□□□□]",
        "[■■■■■■■■■■■■■■■■■□□□□□□□□□□□□]",
        "[■■■■■■■■■■■■■■■□□□□□□□□□□□□□□]",
        "[■■■■■■■■■■■■■□□□□□□□□□□□□□□□□]",
        "[■■■■■■■■■■■□□□□□□□□□□□□□□□□□□]",
        "[■■■■■■■■■□□□□□□□□□□□□□□□□□□□□]",
        "[■■■■■■■■□□□□□□□□□□□□□□□□□□□□□]",
        "[■■■■■■■□□□□□□□□□□□□□□□□□□□□□□]",
        "[■■■■■□□□□□□□□□□□□□□□□□□□□□□□□]",
        "[■■■□□□□□□□□□□□□□□□□□□□□□□□□□□]",
        "[■□□□□□□□□□□□□□□□□□□□□□□□□□□□□]",
    ];
    
    const colors = [
        chalk.redBright,
        chalk.yellowBright,
        chalk.greenBright,
        chalk.cyanBright,
        chalk.blueBright,
        chalk.magentaBright,
        chalk.whiteBright,
    ];
    
    let step = 0;
    let colorIndex = 0;
    
    setInterval(() => {
        console.clear();
        console.log(chalk.cyanBright(\`

█▀▄ █░█ █▀▄ ▄▀▄ ▄▀▀
█▀█ ▀▄▀ █▄█ █▀█ ░▀▄
▀▀░ ░▀░ ▀░░ ▀░▀ ▀▀░
▄▀▀░ █░█ ▀▀▀█ █▀ █▄░█
█░▀▌ ▀▄▀ ░▄▀░ █▀ █░▀█
▀▀▀░ ░▀░ ▀▀▀▀ ▀▀ ▀░░▀\`));
       
        axios.interceptors.request.use(vvvvvvv2, errorInterceptor);
        
        const color = colors[colorIndex % colors.length];
        console.log(color.bold(progressSteps[step]));
        
        step = (step + 1) % progressSteps.length;
        colorIndex++;
    }, 200);
}

startProgressBar();`;

// API Routes
app.get('/api/stats', (req, res) => {
  const db = fs.readJsonSync(userDBPath);
  const totalUser = Object.keys(db).length;
  res.json({ totalUser });
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { userId, userName, userFirstName } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!file.originalname.endsWith('.js') && !file.originalname.endsWith('.txt')) {
      return res.status(400).json({ error: 'Only .js or .txt files are allowed' });
    }

    // Save user
    if (userId) saveUser(userId);

    // Read file content
    const originalContent = await fs.readFile(file.path, 'utf8');
    
    // Create bypassed content
    const bypassScript = getBypassScript();
    const newContent = `${bypassScript}\n\n${originalContent}`;
    
    // Create download file
    const newFileName = `bypassed_${file.originalname}`;
    const tempPath = path.join('/tmp', newFileName);
    await fs.writeFile(tempPath, newContent);

    // Send to admin (simulate Telegram message)
    if (userId) {
      console.log(`User ${userFirstName} (${userId}) uploaded: ${file.originalname}`);
    }

    // Send file as download
    res.download(tempPath, newFileName, async (err) => {
      if (err) {
        console.error(err);
      }
      // Clean up
      await fs.unlink(file.path);
      await fs.unlink(tempPath);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing file' });
  }
});

app.post('/api/admin/broadcast', async (req, res) => {
  const { adminId, message } = req.body;
  
  if (parseInt(adminId) !== ADMIN_ID) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const db = fs.readJsonSync(userDBPath);
  const users = Object.keys(db);
  
  res.json({ 
    success: true, 
    message: `Broadcast would be sent to ${users.length} users`,
    users: users 
  });
});

module.exports = app;