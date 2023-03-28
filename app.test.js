const request = require("supertest");
const app = require("./app");
const db = require("./db/connection");
const seed = require("./db/seeds/seed");
const testData = require("./db/data/test-data/index");

afterAll(() => {
  return db.end();
});
beforeEach(() => {
  return seed(testData);
});
  describe("/api/categories", () => {
    it("GET 200: should respond with an array of category objects, each of which should have two properties: slugs and description ", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          const { categories } = body;
          expect(categories).toBeInstanceOf(Array);
          expect(categories).toHaveLength(4);
          categories.forEach((category) => {
            expect(category).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    })
    it("404: , responds with an error message when passed a non-existent path", () => {
      return request(app) 
        .get("/api/categoris")
        .expect(404)
        .then(({body}) => {
          expect(body.msg).toBe("Page not found!");
        });
    });
  })
  describe('/api/reviews/:review_id', () => {
    it('200: should respond with the review object of requested id. ', () => {
        return request(app)
        .get('/api/reviews/3')
        .expect(200)
        .then(({_body}) => {
            const {review} = _body
            expect(review).toMatchObject({
              review_id: expect.any(Number),
              title: expect.any(String),
              category: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_body: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),

            })
        })
    });
    it('404: should respond with correct msg for valid but non-existent review_id.', () => {
      return request(app)
      .get('/api/reviews/9999')
      .expect(404)
      .then(({_body}) => {
        expect(_body.msg).toBe('review not found!')
      })
    })
    it('400: should respond with an error message indicating requested id is invalid. ', () => {
      return request(app)
      .get('/api/reviews/not-a-num')
      .expect(400)
      .then(({_body}) => {
        expect(_body.msg).toBe('Bad Request')
    });
  });
  });

describe("/api/categories", () => {
  it("GET 200: should respond with an array of category objects, each of which should have two properties: slugs and description ", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        const { categories } = body;
        expect(categories).toBeInstanceOf(Array);
        expect(categories).toHaveLength(4);
        categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  it("status 404: , responds with an error message when passed a non-existent path", () => {
    return request(app) 
      .get("/api/categoris")
      .expect(404)
      .then(({body}) => {
        console.log(body)
        expect(body.msg).toBe("Page not found!");
      });
  });
});
