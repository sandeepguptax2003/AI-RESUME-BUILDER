const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/User');
const Resume = require('../models/Resume');

describe('Resume Routes', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    userId = user._id;
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Resume.deleteMany({});
  });

  describe('POST /api/resumes', () => {
    it('should create a new resume', async () => {
      const res = await request(app)
        .post('/api/resumes')
        .set('x-auth-token', token)
        .send({
          title: 'My Resume',
          sections: [
            { title: 'Education', content: 'Bachelor\'s in Computer Science' },
            { title: 'Experience', content: '2 years as Software Developer' }
          ]
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('title', 'My Resume');
      expect(res.body.sections).toHaveLength(2);
    });
  });

  describe('GET /api/resumes', () => {
    it('should get all resumes for the user', async () => {
      await Resume.create([
        { title: 'Resume 1', sections: [], user: userId },
        { title: 'Resume 2', sections: [], user: userId }
      ]);

      const res = await request(app)
        .get('/api/resumes')
        .set('x-auth-token', token);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveLength(2);
    });
  });

  describe('GET /api/resumes/:id', () => {
    it('should get a specific resume', async () => {
      const resume = await Resume.create({
        title: 'Specific Resume',
        sections: [{ title: 'Skills', content: 'JavaScript, React, Node.js' }],
        user: userId
      });

      const res = await request(app)
        .get(`/api/resumes/${resume._id}`)
        .set('x-auth-token', token);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title', 'Specific Resume');
      expect(res.body.sections).toHaveLength(1);
    });
  });

  describe('PUT /api/resumes/:id', () => {
    it('should update a resume', async () => {
      const resume = await Resume.create({
        title: 'Old Title',
        sections: [],
        user: userId
      });

      const res = await request(app)
        .put(`/api/resumes/${resume._id}`)
        .set('x-auth-token', token)
        .send({
          title: 'Updated Title',
          sections: [{ title: 'New Section', content: 'New Content' }]
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('title', 'Updated Title');
      expect(res.body.sections).toHaveLength(1);
    });
  });

  describe('DELETE /api/resumes/:id', () => {
    it('should delete a resume', async () => {
      const resume = await Resume.create({
        title: 'To Be Deleted',
        sections: [],
        user: userId
      });

      const res = await request(app)
        .delete(`/api/resumes/${resume._id}`)
        .set('x-auth-token', token);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Resume removed');

      const deletedResume = await Resume.findById(resume._id);
      expect(deletedResume).toBeNull();
    });
  });

  describe('POST /api/resumes/:id/suggestions', () => {
    it('should get AI suggestions for a resume', async () => {
      const resume = await Resume.create({
        title: 'My Resume',
        sections: [{ title: 'Skills', content: 'JavaScript, React, Node.js' }],
        user: userId
      });

      const res = await request(app)
        .post(`/api/resumes/${resume._id}/suggestions`)
        .set('x-auth-token', token)
        .send({ jobDescription: 'Senior Frontend Developer position' });
      
      expect(res.statusCode).toEqual(200);
      expect(typeof res.body).toBe('string');
      expect(res.body.length).toBeGreaterThan(0);
    });
  });
});