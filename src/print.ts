import * as fs from 'fs';

const print = async (name: string, s: string) => {
  await fs.promises.writeFile(`./src/${name}.ts`, s);
};

export default print;
