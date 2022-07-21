const fs = require("fs");

const envPath = ".env";
const SESSION_SECRET = [...Array(32)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");

const defaultEnv = `# The following is a fake / example of the env
SESSION_SECRET=${SESSION_SECRET}
ENABLE_METRICS=true
`;

try {
    if (!fs.existsSync(envPath)) {
        fs.writeFileSync(envPath, defaultEnv);
        console.log(".env\n\t- Created default!");
    } else {
        console.log(".env\n\t- Unable to create. Already exists");
    }
} catch (e) {
    console.error(e);
}
