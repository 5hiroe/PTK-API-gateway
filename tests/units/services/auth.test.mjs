import { strict as assert } from 'assert';
import sinon from 'sinon';
import AuthService from '../../../src/services/auth.js';
import UserModel from '../../../src/models/user.js';
import JWTService from '../../../src/services/jwt.js';
import { Conflict, NotFound, Forbidden } from '../../../src/globals/errors.js';
import * as encryptionHelper from '../../../src/helpers/encryption.js';

describe('AuthService', () => {
    let authService, jwtServiceInstanceStub, userModelStub;
  
    beforeEach(() => {
        authService = new AuthService();
        jwtServiceInstanceStub = sinon.stub(JWTService.prototype);
        userModelStub = sinon.stub(UserModel.prototype);
    });
  
    afterEach(() => {
        sinon.restore();
    });
  
    describe('signup', () => {
        it('should throw Conflict if email already exists', async () => {
            sinon.stub(AuthService.prototype, 'emailExists').resolves(true);
            await assert.rejects(authService.signup({ email: 'test@example.com', password: 'password', name: 'Test' }), Conflict);
        });

        /*it('should save a new user with encrypted password', async () => {
            sinon.stub(AuthService.prototype, 'emailExists').resolves(false);
            sinon.stub(encryptionHelper, 'encrypt').returns('encryptedPassword'); // Stub correct du module d'encryption
            userModelStub.save.resolves();
            const user = await authService.signup({ email: 'test@example.com', password: 'password', name: 'Test' });
            assert.equal(user.password, 'encryptedPassword');
        });
        */
    });
    
    describe('login', () => {
        it('should throw Forbidden if user not found', async () => {
            sinon.stub(UserModel, 'findOne').resolves(null);
            await assert.rejects(authService.login({ email: 'test@example.com', password: 'password' }), Forbidden);
        });

        /*it('should return JWT if login successful', async () => {
            const user = { email: 'test@example.com', password: encryptionHelper.encrypt('password'), _id: 'userId' };
            sinon.stub(UserModel, 'findOne').resolves(user);
            sinon.stub(encryptionHelper, 'decrypt').returns('password'); // Stub correct du module de décryptage
            jwtServiceInstanceStub.generate.returns('jwtToken');
            const token = await authService.login({ email: 'test@example.com', password: 'password' });
            assert.equal(token, 'jwtToken');
        });
        */
    });
  
    describe('logout', () => {
        it('should remove JWT', async () => {
            await authService.logout('jwtToken');
            assert(jwtServiceInstanceStub.remove.calledWith('jwtToken'));
        });
    });
  
    describe('updatePassword', () => {
        it('should throw NotFound if user does not exist', async () => {
            sinon.stub(UserModel, 'findOne').resolves(null);
            await assert.rejects(authService.updatePassword({ email: 'test@example.com', password: 'password', newPassword: 'newPassword' }), NotFound);
        });

        /*it('should update password and return new JWT', async () => {
            const user = { email: 'test@example.com', password: encryptionHelper.encrypt('password'), _id: 'userId', save: sinon.stub().resolves() };
            sinon.stub(UserModel, 'findOne').resolves(user);
            sinon.stub(encryptionHelper, 'decrypt').returns('password');
            jwtServiceInstanceStub.generate.returns('newJwt');
            const token = await authService.updatePassword({ email: 'test@example.com', password: 'password', newPassword: 'newPassword' });
            assert.equal(token, 'newJwt');
        });
        */
    });
});
