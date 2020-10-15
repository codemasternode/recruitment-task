import app from '../../../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('POST /api/movies unit tests', () => {
    describe('Should respone with 200', () => {
        it('when send properly movie', (done) => {
            chai.request(app)
                .post('/api/movies')
                .send({
                    id: 86,
                    title: 'The Grand Budapest Hotel',
                    year: 2014,
                    runtime: 99,
                    genres: ['Adventure', 'Comedy', 'Crime'],
                    director: 'Wes Anderson',
                    actors:
                        'Ralph Fiennes, F. Murray Abraham, Mathieu Amalric, Adrien Brody',
                    plot:
                        'The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.',
                    posterUrl:
                        'https://images-na.ssl-images-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg',
                })
                .end((err, response) => {
                    expect(response).to.have.status(200);
                    done();
                });
        });
    });
    describe('Should respone with 400', () => {
        it('when send movie without title', (done) => {
            chai.request(app)
                .post('/api/movies')
                .send({
                    id: 86,
                    year: 2014,
                    runtime: 99,
                    genres: ['Adventure', 'Comedy', 'Crime'],
                    director: 'Wes Anderson',
                    actors:
                        'Ralph Fiennes, F. Murray Abraham, Mathieu Amalric, Adrien Brody',
                    plot:
                        'The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.',
                    posterUrl:
                        'https://images-na.ssl-images-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg',
                })
                .end((err, response) => {
                    expect(response).to.have.status(400);
                    done();
                });
        });
        it('when sen movie without genres', (done) => {
            chai.request(app)
                .post('/api/movies')
                .send({
                    id: 86,
                    year: 2014,
                    title: 'The Grand Budapest Hotel',
                    runtime: 99,
                    director: 'Wes Anderson',
                    actors:
                        'Ralph Fiennes, F. Murray Abraham, Mathieu Amalric, Adrien Brody',
                    plot:
                        'The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.',
                    posterUrl:
                        'https://images-na.ssl-images-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg',
                })
                .end((err, response) => {
                    expect(response).to.have.status(400);
                    done();
                });
        });
    });
});

describe('POST /api/movies/search unit test', () => {
    describe('Should response with 200', () => {
        it('when send only genres property', (done) => {
            chai.request(app)
                .post('/api/movies/search')
                .send({
                    genres: ['Adventure', 'Comedy', 'Crime'],
                })
                .end((err, response) => {
                    expect(response).to.have.status(200);
                    expect(response.body.movies).to.be.an('array');
                    done();
                });
        });
        it('when send only duration property', (done) => {
            chai.request(app)
                .post('/api/movies/search')
                .send({
                    duration: 120,
                })
                .end((err, response) => {
                    expect(response).to.have.status(200);
                    expect(response.body.movie).to.be.an('object');
                    done();
                });
        });
        it('when send genres and duration properties', (done) => {
            chai.request(app)
                .post('/api/movies/search')
                .send({
                    duration: 120,
                    genres: ['Adventure', 'Comedy', 'Crime'],
                })
                .end((err, response) => {
                    expect(response).to.have.status(200);
                    expect(response.body.movies).to.be.an('array');
                    done();
                });
        });
        it('when send without properties', (done) => {
            chai.request(app)
                .post('/api/movies/search')
                .end((err, response) => {
                    expect(response).to.have.status(200);
                    expect(response.body.movie).to.be.an('object');
                    done();
                });
        });
    });
    describe('Should response with 400', () => {
        it('when send genres as different type than expected', (done) => {
            chai.request(app)
                .post('/api/movies/search')
                .send({
                    duration: 120,
                    genres: 120,
                })
                .end((err, response) => {
                    expect(response).to.have.status(400);
                    done();
                });
        });
        it('when send duration as different type than expected', (done) => {
            chai.request(app)
                .post('/api/movies/search')
                .send({
                    duration: '120',
                    genres: ['Adventure', 'Comedy', 'Crime'],
                })
                .end((err, response) => {
                    expect(response).to.have.status(400);
                    done();
                });
        });
        it("when send genre that doesn't exist", (done) => {
            chai.request(app)
                .post('/api/movies/search')
                .send({
                    duration: 120,
                    genres: ['Adventure', 'Comedy', 'XXXXXX'],
                })
                .end((err, response) => {
                    expect(response).to.have.status(400);
                    done();
                });
        });
    });
});
