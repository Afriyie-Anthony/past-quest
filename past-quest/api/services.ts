import { getLocalJson, simulatePost } from "./axios";

export type User = { id: number; email: string; password: string };
export type Question = {
  id: number;
  subject: string;
  year: number;
  institution: string;
  text: string;
  options: string[];
  correctAnswer: string;
};

export async function fetchUsers(): Promise<User[]> {
  return getLocalJson<User[]>("/data/users.json");
}

export async function fetchQuestions(): Promise<Question[]> {
  return getLocalJson<Question[]>("/data/questions.json");
}

export async function login(email: string, password: string): Promise<User> {
  const users = await fetchUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    await simulatePost(null as any, true);
  }
  return simulatePost(user!);
}

export async function register(email: string, password: string): Promise<User> {
  const users = await fetchUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    await simulatePost(null as any, true);
  }
  const newUser: User = { id: Math.max(...users.map((u) => u.id)) + 1, email, password };
  return simulatePost(newUser);
}

export type NewQuestionInput = Omit<Question, "id">;
export async function contributeQuestion(input: NewQuestionInput): Promise<Question> {
  const newQuestion: Question = { id: Math.floor(1000 + Math.random() * 9000), ...input };
  return simulatePost(newQuestion);
}


