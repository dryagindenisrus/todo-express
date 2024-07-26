import path from "path";
import fs from 'fs';
import { parse } from 'yaml'
import { appConfig } from "./app";


export const swaggerConfig = {
  spec: parse(fs.readFileSync(path.join(appConfig.rootDir, 'swagger.yaml'), 'utf8')),
  options: {
    explorer: true,
  } 
}