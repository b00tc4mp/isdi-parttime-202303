const { expect } = require('chai');
const sinon = require('sinon');
const {
  errors: { DuplicityError, ContentError, AuthError, ExistenceError },
} = require('com');
const { handleErrors } = require('../../handlers/helpers');

describe('handleErrors', () => {
  it('should return a 200 no errors for successful response', () => {
    const callbackStub = sinon.stub().resolves();

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    handleErrors(callbackStub)(req, res);

    expect(res.status.args).to.deep.equal([]);
    expect(res.json.args).to.deep.equal([]);
  });

  it('should handle asynchronous errors and respond with status 500', async () => {
    const asyncCallbackStub = async () => {
      throw new Error('Error');
    };

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await handleErrors(asyncCallbackStub)(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: 'Error',
        type: 'Error',
      })
    ).to.be.true;
  });

  it('should handle asynchronous DuplicityError and respond with status 409', async () => {
    const asyncCallbackStub = async () => {
      throw new DuplicityError('Duplicity error');
    };

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await handleErrors(asyncCallbackStub)(req, res);

    expect(res.status.calledWith(409)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: 'Duplicity error',
        type: 'DuplicityError',
      })
    ).to.be.true;
  });

  it('should handle asynchronous AuthError and respond with status 401', async () => {
    const asyncCallbackStub = async () => {
      throw new AuthError('Auth error');
    };

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await handleErrors(asyncCallbackStub)(req, res);

    expect(res.status.calledWith(401)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: 'Auth error',
        type: 'AuthError',
      })
    ).to.be.true;
  });

  it('should handle asynchronous ExistenceError and respond with status 404', async () => {
    const asyncCallbackStub = async () => {
      throw new ExistenceError('Existence error');
    };

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await handleErrors(asyncCallbackStub)(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: 'Existence error',
        type: 'ExistenceError',
      })
    ).to.be.true;
  });

  it('should handle synchronous general Error and respond with status 500', () => {
    const callbackStub = sinon.stub().throws(new Error('Error'));

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    handleErrors(callbackStub)(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'Error', type: 'Error' })).to.be
      .true;
  });

  it('should handle synchronous TypeError and respond with status 406', () => {
    const callbackStub = sinon.stub().throws(new TypeError('Type Error'));

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    handleErrors(callbackStub)(req, res);

    expect(res.status.calledWith(406)).to.be.true;
    expect(
      res.json.calledWithMatch({ message: 'Type Error', type: 'TypeError' })
    ).to.be.true;
  });

  it('should handle synchronous ContentError and respond with status 406', () => {
    const callbackStub = sinon.stub().throws(new ContentError('Content Error'));

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    handleErrors(callbackStub)(req, res);

    expect(res.status.calledWith(406)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: 'Content Error',
        type: 'ContentError',
      })
    ).to.be.true;
  });

  it('should handle synchronous RangeError and respond with status 406', () => {
    const callbackStub = sinon.stub().throws(new RangeError('Range Error'));

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    handleErrors(callbackStub)(req, res);

    expect(res.status.calledWith(406)).to.be.true;
    expect(
      res.json.calledWithMatch({
        message: 'Range Error',
        type: 'RangeError',
      })
    ).to.be.true;
  });
});
