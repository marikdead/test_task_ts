import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import path, { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(@Res() res: Response): void {
    const indexPath = join(__dirname, '..', 'front', 'index.html');
    res.sendFile(indexPath);
  }

  @Get(':name')
  async getFile(@Param('name') name: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', 'front', name);
    res.sendFile(filePath);
  }
}
