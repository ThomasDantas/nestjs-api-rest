import { Controller, Get } from '@nestjs/common'

class Health {
  msg: string

  constructor(msg: string) {
    this.msg = msg
  }
}

@Controller()
export class AppController {
  @Get('health')
  getHello(): Health {
    return new Health('Health Check')
  }
}
