import { strict as assert } from 'assert';
import sinon from 'sinon';
import AuthService from '../../../src/services/auth.js';
import UserModel from '../../../src/models/user.js';
import JWTService from '../../../src/services/jwt.js';
import { Conflict, NotFound, Forbidden } from '../../../src/globals/errors.js';

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
    });

    describe('login', () => {
        it('should throw Forbidden if user not found', async () => {
            sinon.stub(UserModel, 'findOne').resolves(null);
            await assert.rejects(authService.login({ email: 'test@example.com', password: 'password' }), Forbidden);
        });
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
    });
});
