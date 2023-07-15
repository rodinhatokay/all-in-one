import { Inject, Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { SpacesServiceLib, UploadedMulterFileI } from ".";

@Injectable()
export class SpacesService {
	constructor(@Inject(SpacesServiceLib) private readonly s3: AWS.S3) {}

	async uploadFile(file: UploadedMulterFileI) {
		// Precaution to avoid having 2 files with the same name
		const fileName = `${Date.now()}-${file.originalname}`;

		// Return a promise that resolves only when the file upload is complete
		return new Promise((resolve, reject) => {
			this.s3.putObject(
				{
					Bucket: "business-logos",
					Key: fileName,
					Body: file.buffer,
					ACL: "public-read",
				},
				(error: AWS.AWSError) => {
					if (!error) {
						resolve(
							`https://business-logos.fra1.digitaloceanspaces.com/${fileName}`,
						);
					} else {
						reject(
							new Error(
								`SpacesService_ERROR: ${
									error.message || "Something went wrong"
								}`,
							),
						);
					}
				},
			);
		});
	}
}

