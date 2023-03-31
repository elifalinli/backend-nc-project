const request = require("supertest");
const app = require("./app");
const db = require("./db/connection");
const seed = require("./db/seeds/seed");
const testData = require("./db/data/test-data/index");
const sorted = require("jest-sorted");

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
  });
  it("404: , responds with an error message when passed a non-existent path", () => {
    return request(app)
      .get("/api/categoris")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Page not found!");
      });
  });
});
describe("/api/reviews/:review_id", () => {
  it(" GET 200: should respond with the review object of requested id. ", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        const { review } = body;
        expect(review).toMatchObject({
          review_id: 3,
          title: expect.any(String),
          category: expect.any(String),
          designer: expect.any(String),
          owner: expect.any(String),
          review_body: expect.any(String),
          review_img_url: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
        });
      });
  });
  it("404: should respond with correct msg for valid but non-existent review_id.", () => {
    return request(app)
      .get("/api/reviews/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("review not found!");
      });
  });
  it("400: should respond with an error message indicating requested id is invalid. ", () => {
    return request(app)
      .get("/api/reviews/not-a-num")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});
describe("/api/reviews", () => {
  it("GET 200: should respond with a reviews array of review objects ", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        const { reviews } = body;
        expect(reviews).toBeInstanceOf(Array);
        expect(reviews).toHaveLength(13);
        reviews.forEach((review) => {
          expect(review).toMatchObject({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          });
        });
        expect(reviews).toBeSorted({ descending: true });
      });
  });
});
describe("/api/reviews/:review_id/comments", () => {
  it("GET 200: should respond with an array of comments for the given review_id of each comment", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(3)
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            review_id: 3,
            created_at: expect.any(String),
            votes: expect.any(Number),
          });
        });
        expect(comments).toBeSorted({ descending: true });
      });
  });
  it("GET 200: should respond with an empty array if given review_id exist but no comment found with it. ", () => {
    return request(app)
      .get("/api/reviews/5/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
  it("GET 400: should respond with an error message indicating requested id is invalid. ", () => {
    return request(app)
      .get("/api/reviews/not-a-num/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  it("GET 404: should respond with correct msg for valid but non-existent review_id.", () => {
    return request(app)
      .get("/api/reviews/999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("comments not found!");
      });
  });
});

describe(" /api/reviews/:review_id/comments", () => {
  it("POST 201: should request body accepts an object with two properties: username and body. And should respond with posted comment.", () => {
    const newComment = { username: "philippaclaire9", body: "cool game!" };
    return request(app)
      .post("/api/reviews/5/comments")
      .send(newComment)
      .expect(201)
      .then((res) => {
        expect(res.body.comment).toMatchObject({
          comment_id: expect.any(Number),
          review_id: 5,
          author: "philippaclaire9",
          body: "cool game!",
          votes: expect.any(Number),
          created_at: expect.any(String),
        });
      });
  });
  it("GET 400: should respond with an error message indicating requested id is invalid. ", () => {
    const newComment = { username: "philippaclaire9", body: "cool game!" };
    return request(app)
      .post("/api/reviews/not-a-num/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  it("GET 404: should respond with an error message if the username is not valid. ", () => {
    const newComment = { username: "elif", body: "cool game!" };
    return request(app)
      .post("/api/reviews/5/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("username not found!");
      });
  });
  it("GET 404: should respond with correct msg for valid but non-existent id.", () => {
    const newComment = { username: "philippaclaire9", body: "cool game!" };
    return request(app)
      .post("/api/reviews/999/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("ID does not exist!");
      });
  });
  it("POST 201: should ignore unnecessary properties that sent with the comment. ", () => {
    const newComment = {
      username: "philippaclaire9",
      body: "cool game!",
      number: 7,
    };
    return request(app)
      .post("/api/reviews/5/comments")
      .send(newComment)
      .expect(201)
      .then((res) => {
        expect(res.body.comment).toMatchObject({
          comment_id: expect.any(Number),
          review_id: 5,
          author: "philippaclaire9",
          body: "cool game!",
          votes: expect.any(Number),
          created_at: expect.any(String),
        });
      });
  });
  it("GET 400: should respond with an error message if there is a missing key in the request. ", () => {
    const newComment = { username: "philippaclaire9" };
    return request(app)
      .post("/api/reviews/5/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("something is missing with your request!");
      });

  });
});
