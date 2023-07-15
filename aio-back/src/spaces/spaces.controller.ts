import {
	Controller,
	UploadedFile,
	UseInterceptors,
	Post,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedMulterFileI } from "./SpacesService";
import { SpacesService } from "./SpacesService/SpacesService";

@Controller("space")
export class SpacesController {
	constructor(private readonly spacesService: SpacesService) {}

	@UseInterceptors(FileInterceptor("file"))
	@Post("spaces")
	async uploadFile(@UploadedFile() file: UploadedMulterFileI) {
		const url = await this.spacesService.uploadFile(file);

		return {
			url,
		};
	}
}

