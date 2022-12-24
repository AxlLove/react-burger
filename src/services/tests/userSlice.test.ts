import {getUser} from "../slices/getUserSlice";
import {logoutUser} from "../slices/logoutUserSlice";
import {registerUser} from "../slices/registerUserSlice";
import{updateUserInfo} from "../slices/updateUserSlice";
import reducer from "../slices/userSlice";
import {loginUser} from "../slices/loginUserSlice";


const initialState = {
    userInfo: null,
};
const state = {userInfo: {name: 'another-name', email: 'another-email'}}

describe('getUser', ()=> {
    it('should return default state an empty action', ()=> {
        const result = reducer(undefined, {type: ''})

        expect(result).toEqual(initialState)
    })
    it('should add user info when getUser.fulfilled action', ()=> {
        const action = {type: getUser.fulfilled.type, payload: {user: {name: 'some-name', email: 'some-email'}}}
        const result = reducer(initialState, action)
        expect(result.userInfo).toEqual({name: 'some-name', email: 'some-email'})
    })
    it('should remove user info when logoutUser.fulfilled action', ()=> {
        const action = {type: logoutUser.fulfilled.type}
        const result = reducer(initialState, action)
        expect(result.userInfo).toBeNull()
    })
    it('should add user info when registerUser.fulfilled action', ()=> {
        const action = {type: registerUser.fulfilled.type, payload: {user: {name: 'some-name', email: 'some-email'}}}
        const result = reducer(initialState, action)
        expect(result.userInfo).toEqual({name: 'some-name', email: 'some-email'})
    })
    it('should add user info when loginUser.fulfilled action', ()=> {
        const action = {type: loginUser.fulfilled.type, payload: {user: {name: 'some-name', email: 'some-email'}}}
        const result = reducer(initialState, action)
        expect(result.userInfo).toEqual({name: 'some-name', email: 'some-email'})
    })
    it('should update user info when loginUser.fulfilled action', ()=> {
        const state = {userInfo: {name: 'another-name', email: 'another-email'}}
        const action = {type: updateUserInfo.fulfilled.type, payload: {user: {name: 'some-name', email: 'some-email'}}}
        const result = reducer(state, action)
        expect(result.userInfo).toEqual({name: 'some-name', email: 'some-email'})
    })
    it('should remove user info when updateUserInfo.rejected action', ()=> {
        const action = {type: updateUserInfo.rejected.type}
        const result = reducer(state, action)
        expect(result.userInfo).toBeNull()
    })
    it('should remove user info when logoutUser.rejected action', ()=> {
        const action = {type: logoutUser.rejected.type}
        const result = reducer(state, action)
        expect(result.userInfo).toBeNull()
    })
    it('should remove user info when getUser.rejected action', ()=> {
        const action = {type: getUser.rejected.type}
        const result = reducer(state, action)
        expect(result.userInfo).toBeNull()
    })

})