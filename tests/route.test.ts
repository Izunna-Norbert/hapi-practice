import Lab from '@hapi/lab'
import Code from '@hapi/code'
import { init } from '../src/index'
import { DBconnection } from '../src/db';
import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';


const { describe, it, before, after } = exports.lab = Lab.script();
const { expect } = Code;


describe('GET /', () => {
    let server: Server;

    before(async () => {
        server = await init();
    });

    after(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/'
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('GET /templates', () => {
    let server: Server;
    let database: DataSource;

    before(async () => {
        server = await init();
        database = await DBconnection();
    });

    after(async () => {
        await database.destroy();
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/templates'
        });
        console.log(res.result);
        expect(res.statusCode).to.equal(200);
    });
});

describe('GET /templates/{id}', () => {
    let server: Server;
    let database: DataSource;

    before(async () => {
        server = await init();
        database = await DBconnection();
    });

    after(async () => {
        await database.destroy();
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/templates/newsletter-subscription'
        });
        console.log(res.result);
        expect(res.statusCode).to.equal(200);
    });
})

