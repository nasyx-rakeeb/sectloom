import pc from 'picocolors';

export const logger = {
  info: (msg: string) => console.log(pc.blue('[INFO] ') + msg),
  success: (msg: string) => console.log(pc.green('[SUCCESS] ') + msg),
  warn: (msg: string) => console.warn(pc.yellow('[WARN] ') + msg),
  error: (msg: string) => console.error(pc.red('[ERROR] ') + msg),
  text: (msg: string) => console.log(msg),
};
