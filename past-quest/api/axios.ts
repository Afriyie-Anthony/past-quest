import axios, { AxiosAdapter, AxiosResponse } from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

// For Expo, we can load local JSON via the Metro bundler using relative paths from project root when using Web or during dev.
// We'll request from `/data/*.json` which Metro serves as assets in dev.

function resolveBaseURL() {
  if (Platform.OS === "web") return "";
  // On native, build a base URL pointing to Metro dev server host
  // hostUri looks like "192.168.1.10:8081" or "localhost:8081"
  const hostUri = (Constants as any)?.expoConfig?.hostUri || (Constants as any)?.manifest2?.extra?.expoClient?.hostUri;
  if (hostUri) {
    return `http://${hostUri}`;
  }
  return "";
}

export const api = axios.create({ baseURL: resolveBaseURL(), timeout: 5000 });

// Custom adapter: serve local JSON for /data/* requests via require/import
const originalAdapter: AxiosAdapter | undefined = api.defaults.adapter;

api.defaults.adapter = async (config) => {
  const url = config.url || "";
  if (url.startsWith("/data/") && config.method?.toLowerCase() === "get") {
    let data: any;
    try {
      if (url.endsWith("users.json")) {
        data = (await import("../data/users.json")) as any;
        data = (data as any).default ?? data;
      } else if (url.endsWith("questions.json")) {
        data = (await import("../data/questions.json")) as any;
        data = (data as any).default ?? data;
      } else {
        throw new Error("Unknown data path");
      }
      const response: AxiosResponse = {
        data,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
        request: {},
      };
      return Promise.resolve(response);
    } catch (e) {
      const response: AxiosResponse = {
        data: { message: "Not found" },
        status: 404,
        statusText: "Not Found",
        headers: {},
        config,
        request: {},
      };
      return Promise.resolve(response);
    }
  }
  if (originalAdapter) return originalAdapter(config);
  throw new Error("No axios adapter available");
};

export async function getLocalJson<T>(path: string): Promise<T> {
  const response = await api.get<T>(path, { headers: { "Cache-Control": "no-cache" } });
  return response.data;
}

// Simulate POST requests
export async function simulatePost<T>(data: T, shouldFail = false, delayMs = 600): Promise<T> {
  await new Promise((r) => setTimeout(r, delayMs));
  if (shouldFail) throw new Error("Request failed");
  return data;
}


