import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

interface AuthState {
  user: null | {
    id: string;
    name: string;
    email: string;
  };
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

// 로그인 (비동기 처리)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log("🔥 Redux 비동기 액션 실행 중...");

      const response = await fetch("https://church-scheduler-server.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("🔥 서버 응답 수신 완료", response);

      const contentType = response.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("❌ 서버에서 JSON이 아닌 응답을 반환함:", text);
        throw new Error("서버에서 올바른 JSON 응답을 보내지 않았습니다.");
      }

      if (!response.ok) {
        console.error("❌ 로그인 실패 (서버 응답 오류):", data.message);
        throw new Error(data.message || "로그인 실패");
      }

      await AsyncStorage.setItem("jwt_token", data.token);

      console.log("✅ 로그인 성공!", data);

      return data;
    } catch (error: any) {
      console.error("❌ Redux 로그인 오류 발생:", error.message);
      return rejectWithValue(error.message);
    }
  }
)

// 비동기 회원가입
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("https://church-scheduler-server.onrender.com/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

    // 응답이 JSON인지 확인 후 파싱
    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error("❌ 예상치 못한 응답:", text);
      throw new Error("서버에서 올바른 JSON 응답을 보내지 않았습니다.");
    }

    if (!response.ok) {
      throw new Error(data.message || "회원가입 중 오류가 발생했습니다.");
    }

    return data; // ✅ 정상 응답 반환
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  "auth/logoutUser", 
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem("jwt_token");
    } catch (error: any) {
      console.log("❌ 로그아웃 오류 발생:", error.message);
      return rejectWithValue(error.message);
    }
});

// 슬라이스 생성
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null; 
      })
  },
});

export default authSlice.reducer;