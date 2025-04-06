// import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
// import { FSHandler } from '../helpers/fs.helper';

// @Injectable()
// export class CsvValidationPipe implements PipeTransform {
//   transform(file: Express.Multer.File) {
//     if (!file) {
//       throw new BadRequestException('No files were uploaded.');
//     }

//     if (!file.originalname.endsWith('.csv')) {
//       FSHandler.unlinkLocalFile(file.path);
//       throw new BadRequestException('Only CSV files are allowed.');
//     }

//     if (file.mimetype !== 'text/csv') {
//       FSHandler.unlinkLocalFile(file.path);
//       throw new BadRequestException('The uploaded file is not a valid CSV.');
//     }

//     return file;
//   }
// }
