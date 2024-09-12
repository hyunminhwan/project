import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"; 
import storage from "redux-persist/lib/storage"; 

let loginMember = createSlice({
    name: 'member',
    initialState: {
        isAuthenticated: false, // 로그인 상태
        member: null, // 사용자 정보
    },
    reducers: {
        login(state, { payload }) {
            state.isAuthenticated = true;
            state.member = payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.member = null;
        }
    }
});

// Redux-persist 설정
const persistConfig = {
    key: 'loginMember', // 상태를 저장할 key
    storage, // localStorage 사용 
};

const persistedReducer = persistReducer(persistConfig, loginMember.reducer);

// 스토어 생성 후 persistStore에 store 전달
const store = configureStore({
    reducer: {
        loginMember: persistedReducer
    }
});

export const persistor = persistStore(store); // store 이후에 persistor 생성
export let { login, logout } = loginMember.actions;

export default store;
