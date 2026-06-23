module.exports = {
  apps: [
    {
      name: "nexo-store",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      max_memory_restart: "512M",
      restart_delay: 3000,
      autorestart: true,
      watch: false,
    },
  ],
};
