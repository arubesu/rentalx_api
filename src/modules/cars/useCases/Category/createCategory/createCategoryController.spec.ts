import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection, createConnection } from 'typeorm';
import { v4 } from 'uuid';

import { app } from '../../../../../app';

let connection: Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const id = v4();
    const password = await hash('admin', 8);
    await connection.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
          values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'license')
        `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create a new category', async () => {
    const {
      body: { token },
    } = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin',
    });
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'name',
        description: 'description',
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(201);
  });

  it('Should not to be able to create a duplicated category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@admin.com',
      password: 'admin',
    });
    const { token } = responseToken.body;
    const response = await request(app)
      .post('/categories')
      .send({
        name: 'name',
        description: 'description',
      })
      .set({ Authorization: `Bearer ${token}` });
    expect(response.status).toBe(400);
  });
});
