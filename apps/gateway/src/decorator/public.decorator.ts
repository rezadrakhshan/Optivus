import { SetMetadata } from '@nestjs/common';
import * as config from "config"

const cfg:any = config.get("jwt")

export const IS_PUBLIC_KEY = cfg.public_key;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);