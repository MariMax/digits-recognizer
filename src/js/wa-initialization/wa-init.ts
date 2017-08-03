const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
const env = {
  'abortStackOverflow': () => { throw new Error('overflow'); },
  'table': new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }),
  'tableBase': 0,
  'memory': memory,
  'memoryBase': 1024,
  'STACKTOP': 0,
  'STACK_MAX': memory.buffer.byteLength,
};
const importObject = { env };

export async function createWebAssembly(path: string, env: any = importObject) {
  const bytes = await window.fetch(path).then(x => x.arrayBuffer());
  return WebAssembly.instantiate(bytes, env);
}