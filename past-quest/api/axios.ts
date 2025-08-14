import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosHeaders,
  Method,
} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** ============================= */
/** ====== CONFIG & CLIENT ====== */
/** ============================= */

const BASE_URL = "";
const TIMEOUT_MS = 10000;

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT_MS,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/** --------------------------------
 * Token helpers (RN AsyncStorage)
 * ------------------------------- */
const TOKEN_KEY = "token";

export async function setAuthToken(token: string | null) {
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(TOKEN_KEY);
  }
}

export async function getAuthToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

/** --------------------------------
 * Request interceptor – attach Bearer
 * ------------------------------- */
api.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    const headers = new AxiosHeaders(config.headers);
    headers.set("Authorization", `Bearer ${token}`);
    config.headers = headers;
  }
  return config;
});

/** --------------------------------
 * Response interceptor – normalize errors
 * ------------------------------- */
export interface ApiErrorPayload {
  status: number;
  message: string;
  details?: unknown;
}

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<any>): Promise<never> => {
    const response = error.response as AxiosResponse | undefined;

    const normalized: ApiErrorPayload = {
      status: response?.status ?? 0,
      message:
        (response?.data && (response.data.message || response.data.error)) ||
        error.message ||
        "Network error",
      details: response?.data,
    };

    return Promise.reject(normalized);
  }
);

/** ============================= */
/** ===== Core request helper ==== */
/** ============================= */

async function makeRequest<T>(
  method: Method,
  path: string,
  data?: unknown,
  config?: Omit<AxiosRequestConfig, "method" | "url" | "data">
): Promise<T> {
  const headers =
    config?.headers instanceof AxiosHeaders
      ? config.headers
      : new AxiosHeaders(config?.headers as any);

  const response = await api.request<T>({
    method,
    url: path,
    data,
    ...config,
    headers,
  });

  return response.data;
}

/** ============================= */
/** ========= AUTH API ========== */
/** ============================= */

export interface AuthUser {
  id: string;
  fullname: string;
  studentId: string;
}

export async function signUp(
  fullname: string,
  studentId: string,
  password: string
): Promise<{ id: string; fullname: string; studentId: string; createdAt: string }> {
  return makeRequest("post", "/auth/signup", { fullname, studentId, password });
}

export async function login(
  studentId: string,
  password: string
): Promise<{ token: string; user: AuthUser }> {
  const result = await makeRequest<{ token: string; user: AuthUser }>(
    "post",
    "/auth/login",
    { studentId, password }
  );
  // store token so subsequent calls are authorized
  await setAuthToken(result.token);
  return result;
}

export async function forgotPassword(
  studentId: string
): Promise<{ message: string; expiresIn: number }> {
  return makeRequest("post", "/auth/forgot-password", { studentId });
}

export async function verifyOTP(
  studentId: string,
  otp: string
): Promise<{ message: string; resetToken: string }> {
  return makeRequest("post", "/auth/verify-otp", { studentId, otp });
}

export async function resetPassword(
  newPassword: string,
  resetToken: string
): Promise<{ message: string }> {
  const headers = new AxiosHeaders();
  headers.set("Authorization", `Bearer ${resetToken}`);

  const res = await makeRequest<{ message: string }>(
    "post",
    "/auth/reset-password",
    { newPassword },
    { headers }
  );

  // usually reset tokens are one-time; clear any stale login token
  await setAuthToken(null);
  return res;
}

/** ============================= */
/** ======== QUESTIONS API ====== */
/** ============================= */

export interface Question {
  id: string;
  title: string;
  year: string;
  description: string;
  course: string;
  file: string[];     // server returns URLs/IDs
  examType: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FilterParams {
  year?: string;
  course?: string;
  examType?: string;
}

/**
 * React-Native friendly file type. (Web has File/Blob, RN has { uri, name, type })
 */
export type RNFile = {
  uri: string;   // e.g. "file:///path/to/file.pdf" or "content://..."
  name: string;  // e.g. "questions.pdf"
  type: string;  // e.g. "application/pdf"
};

/**
 * Accepts either a Web File/Blob (browser) OR an RNFile (React Native).
 */
type Uploadable =
  | RNFile
  | File
  | Blob;

/**
 * Build FormData consistently for both Web & React Native.
 */
function appendUpload(form: FormData, key: string, file: Uploadable) {
  // React Native path (no global File)
  if (
    typeof File === "undefined" ||
    !(file instanceof (global as any).File) && !(file instanceof (global as any).Blob)
  ) {
    const rn = file as RNFile;
    form.append(key, {
      uri: rn.uri,
      name: rn.name,
      type: rn.type,
    } as any);
    return;
  }

  // Web path (File/Blob)
  const web = file as File | Blob;
  const name = (web as File).name ?? "upload";
  form.append(key, web, name);
}

export async function uploadQuestion(
  file: Uploadable,
  metadata: {
    title: string;
    year: string;
    description: string;
    course: string;
    examType: string;
  },
  onProgress?: (percentage: number) => void
): Promise<Question> {
  const formData = new FormData();
  appendUpload(formData, "file", file);

  Object.entries(metadata).forEach(([k, v]) => {
    formData.append(k, v);
  });

  const headers = new AxiosHeaders();
  // Let Axios set the correct boundary; we just declare multipart
  headers.set("Content-Type", "multipart/form-data");

  return makeRequest<Question>("post", "/upload", formData, {
    headers,
    onUploadProgress:
      onProgress
        ? (e) => {
            if (typeof e.total === "number" && e.total > 0) {
              const percent = Math.round((e.loaded * 100) / e.total);
              onProgress(percent);
            }
          }
        : undefined,
  });
}

export async function getQuestions(params?: FilterParams): Promise<Question[]> {
  return makeRequest<Question[]>("get", "/upload", undefined, { params });
}

export async function getQuestionById(id: string): Promise<Question> {
  return makeRequest<Question>("get", `/upload/${id}`);
}

export async function updateQuestion(
  id: string,
  updates: Partial<Pick<Question, "title" | "description">>
): Promise<Question> {
  return makeRequest<Question>("patch", `/upload/${id}`, updates);
}

export async function deleteQuestion(id: string): Promise<{ message: string }> {
  return makeRequest<{ message: string }>("delete", `/upload/${id}`);
}

export async function downloadFile(
  id: string
): Promise<{ downloadUrl: string }> {
  return makeRequest<{ downloadUrl: string }>("get", `/upload/download/${id}`);
}

/** ============================= */
/** ========= TYPES BUNDLE ====== */
/** ============================= */

export type API = {
  // auth
  signUp: typeof signUp;
  login: typeof login;
  forgotPassword: typeof forgotPassword;
  verifyOTP: typeof verifyOTP;
  resetPassword: typeof resetPassword;
  // questions
  uploadQuestion: typeof uploadQuestion;
  getQuestions: typeof getQuestions;
  getQuestionById: typeof getQuestionById;
  updateQuestion: typeof updateQuestion;
  deleteQuestion: typeof deleteQuestion;
  downloadFile: typeof downloadFile;
};


