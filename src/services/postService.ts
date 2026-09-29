import { api } from "@/services/api";
import { PostSchema, type Post } from "@/schemas/postSchema";

export async function fetchPost(postId: number): Promise<Post> {
  const response = await api.get(`/posts/${postId}`);

  // O safeParse não lança erro, ele retorna um objeto com { success, data, error }
  const parsed = PostSchema.safeParse(response.data);

  if (!parsed.success) {
    console.error("Falha na validação dos dados da API:", parsed.error);
    throw new Error("Formato de dados inválido retornado pelo servidor.");
  }

  return parsed.data;
}
