import { ApiProperty } from "@nestjs/swagger";
import { Paginated } from "@repo/shared";

export class PaginatedDto<T> implements Paginated<T> {
    @ApiProperty({
        description: "The total number of items",
        example: 100,
    })
    total: number;

    @ApiProperty({
        description: "The size of the page",
        example: 10,
    })
    size: number;

    @ApiProperty()
    list: T[];
}
