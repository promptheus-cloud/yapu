// Replace: {{APP_NAME}}, {{PORT}}
module.exports = {
  apps: [{
    name: "{{APP_NAME}}",
    script: "node_modules/.bin/next",
    args: "start -p {{PORT}}",
    cwd: "/home/{{APP_NAME}}",
    env: { NODE_ENV: "production" }
  }]
};
