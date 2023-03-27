const request = require("supertest");
const app = require("./app");
const db = require("./db/connection");
const seed = require("./db/seeds/seed");
const testData = require('./db/data/test-data/index')


afterAll(() => {
    return db.end();
  });
  beforeEach(() => {
    return seed(testData);
  });

  describe('/api/categories', () => {
    it('GET 200: should respond with an array of category objects, each of which should have two properties: slugs and description ', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then(({body}) => {
            const {categories} = body;
            expect(categories).toBeInstanceOf(Array);
            expect(categories).toHaveLength(4);
            categories.forEach((category) => {
                expect(category).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    });
                });
        });
    })
  });