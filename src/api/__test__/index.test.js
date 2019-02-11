import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

chai.use(chaiHttp);
chai.should();

describe('API /api', function () {
  it('GET/ Root path', function (done) {
    chai.request(app)
      .get('/api')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        done();
      });
  });

  it('Non-existing path', function (done) {
    chai.request(app)
      .get('/path_not_exist')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
