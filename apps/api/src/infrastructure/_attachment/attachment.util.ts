import { faker } from "@faker-js/faker";
import { extname } from "path";
import { ExpectedErrorException } from "src/common/error/expected-error.exception";

export const imageFileFilter = (
    _: any,
    file: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer;
    },
    callback: (error: Error | null, acceptFile: boolean) => void
) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/)) {
        return callback(
            new ExpectedErrorException(
                "BAD_REQUEST",
                { file },
                "Image file only allowed"
            ),
            false
        );
    }
    callback(null, true);
};

export const zipFileFilter = (
    _: any,
    file: {
        fieldname: string;
        originalname: string;
    },
    callback: (error: Error | null, acceptFile: boolean) => void
) => {
    if (!file.originalname.match(/\.(zip|ZIP)$/)) {
        return callback(
            new ExpectedErrorException(
                "BAD_REQUEST",
                { file },
                "Save file only allowed"
            ),
            false
        );
    }
    callback(null, true);
};

export const editFilename = (
    _: any,
    file: {
        originalname: string;
    },
    callback: (error: Error | null, filename: string) => void
) => {
    const { originalname } = file;
    const extension = extname(originalname);
    const randomName = faker.string.uuid();
    callback(null, `${randomName}${extension}`);
};
