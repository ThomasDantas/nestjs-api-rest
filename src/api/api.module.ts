import { Module } from '@nestjs/common'
import { RouterModule, Routes } from 'nest-router'
import { routesv1, V1Module } from './v1/v1.module'

const routes: Routes = [
  {
    path: '/v1',
    module: V1Module,
    children: routesv1,
  },
]

@Module({
  imports: [RouterModule.forRoutes(routes), V1Module],
})
export class ApiModule {}
