import { revalidatePath } from "next/cache";

export function revalidateSitePaths(paths: string[], type?: 'page' | 'layout') {
  for (const path of paths) revalidatePath(path, type);
}
