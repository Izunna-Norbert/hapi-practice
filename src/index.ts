import Hapi, { Server } from '@hapi/hapi';
import dotenv from 'dotenv';
import { DBconnection } from './db';
import 'colors';
import { get } from 'node-emoji';
import { templateController, fieldsController } from './controllers';

dotenv.config();

const server: Server = Hapi.server({
  port: process.env.PORT || 3000,
});

export const start = async () => {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    },
  });

  const database = await DBconnection();
  server.route(templateController(database.manager));
  server.route(fieldsController(database.manager));
  await server.start();
  console.log(`${get('rocket')} ${'Server'.green} ${'running'.green} on ${server.info.uri}`, get('rocket'));

  return server;
};

export const init = async (): Promise<Server> => {
  await server.initialize();
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(`${get('x')} ${'Server'.red} ${'failed'.red} to start`);
  console.log(err);
  process.exit(1);
});

start();
