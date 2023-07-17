// index.ts
import * as AWS from "aws-sdk";
import { Provider } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

// Unique identifier of the service in the dependency injection layer
export const SpacesServiceLib = "lib:do-spaces-service";

export const SpacesServiceProvider: Provider<AWS.S3> = {
  provide: SpacesServiceLib,
  useFactory: (configService: ConfigService) => {
    const endpoint = configService.get<string>('SPACES_ENDPOINT');
    const accessKeyId = configService.get<string>('SPACES_ACCESS_KEY_ID');
    const secretAccessKey = configService.get<string>('SPACES_SECRET_ACCESS_KEY');
    
    const spacesEndpoint = new AWS.Endpoint(endpoint);
    
    const s3 = new AWS.S3({
      endpoint: spacesEndpoint.href,
      credentials: new AWS.Credentials({
        accessKeyId,
        secretAccessKey,
      }),
    });
    
    return s3;
  },
  inject: [ConfigService], // Inject the ConfigService
};

export interface UploadedMulterFileI {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	buffer: Buffer;
	size: number;
}
