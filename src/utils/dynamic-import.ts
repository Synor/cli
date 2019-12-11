export async function dynamicImport<T = any>(path: string): Promise<T> {
  return import(path).then(m => m.default || m)
}
