import app from './app';
// import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';

let server: Server;
main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017");

    server = app.listen(5000, () => {
      console.log(`Pet care server is listening on port ${5000}`);
    });
  } catch (error) {
    console.log({
      project_url: 'process.cwd()',
      message: 'failed to connect',
      error: error,
    });
  }
}

process.on('unhandledRejection', () => {
  console.log('unhandledRejection. shutting down server');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException. shutting down');
  process.exit(1);
});

// Promise.reject();
// console.log(x)
