import "reflect-metadata";
import request from 'supertest';

import Server from '../../models/server.models';


require('dotenv').config();
const server = new Server();

beforeAll(async () => {
  await server.connectDBTest();
  server.listen();
});



describe('GET /api/catalogs/reservation/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/reservation/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/reservation/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/reservation/1').send();
    expect(response.statusCode).toBe(200);
  });
});





describe('GET /api/catalogs/client/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/client/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/client/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/client/1').send();
    expect(response.statusCode).toBe(200);
  });
});





describe('GET /api/catalogs/employee/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/employee/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/employee/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/employee/1').send();
    expect(response.statusCode).toBe(200);
  });
});





describe('GET /api/catalogs/user/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/user/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/user/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/user/1').send();
    expect(response.statusCode).toBe(200);
  });
});





describe('GET /api/catalogs/role/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/role/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/role/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/role/1').send();
    expect(response.statusCode).toBe(200);
  });
});





describe('GET /api/catalogs/floor/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/floor/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/floor/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/floor/1').send();
    expect(response.statusCode).toBe(200);
  });
});





describe('GET /api/catalogs/room/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/room/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/room/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/room/1').send();
    expect(response.statusCode).toBe(200);
  });
});





describe('GET /api/catalogs/room-status/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/room-status/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/room-status/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/room-status/1').send();
    expect(response.statusCode).toBe(200);
  });
});





describe('GET /api/catalogs/room-type/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/room-type/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/room-type/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/room-type/1').send();
    expect(response.statusCode).toBe(200);
  });
});





describe('GET /api/catalogs/supplie/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/supplie/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/supplie/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/supplie/1').send();
    expect(response.statusCode).toBe(200);
  });
});





describe('GET /api/catalogs/equipment/', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/equipment/').send();
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/catalogs/equipment/1', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(server.getApp).get('/api/catalogs/equipment/1').send();
    expect(response.statusCode).toBe(200);
  });
});





