import { ApiProperty } from "@nestjs/swagger";

export class CreateDto {
	@ApiProperty()
	title: string;
	@ApiProperty({
		required: false,
		default: false
	})
	isCompleted?: boolean;
}

export class UpdateDto {
	@ApiProperty()
	title: string;
	@ApiProperty({
		required: false,
		default: false
	})
	isCompleted?: boolean;
}