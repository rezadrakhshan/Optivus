import { Global, Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as config from 'config';

const cfg: any = config.get('object-storage');

@Global()
@Injectable()
export class StorageService {
  private readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      endpoint: cfg.ARVAN_ENDPOINT,
      region: 'us-east-1',
      credentials: {
        accessKeyId: cfg.ARVAN_ACCESS_KEY,
        secretAccessKey: cfg.ARVAN_SECRET_KEY,
      },
      forcePathStyle: true,
    });
  }

  async upload(file: any, key: string) {
    const command = new PutObjectCommand({
      Bucket: cfg.ARVAN_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.client.send(command);

    return { key };
  }
}
