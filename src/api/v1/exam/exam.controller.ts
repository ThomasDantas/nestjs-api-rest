import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common'
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiOperation,
  ApiNoContentResponse,
} from '@nestjs/swagger'
import {
  created,
  ok,
  removed,
  updated,
} from '../../../infra/http-response/http-success'
import { HttpResponse } from '../../../infra/http.protocol'
import { HttpInterceptor } from 'src/infra/interceptors/http.interceptor'
import ErrorResponse from './infra/response/ErrorResponse'
import { CreateExamRequest } from './infra/request/CreateExamRequest'
import { ExamService } from './exam.service'
import CreatedExamBodyObjectResponse from './infra/response/CreatedExamObjectResponse'
import ExamBodyArrayResponse from './infra/response/ExamArrayResponse'
import { ExamIdRequest } from './infra/request/ExamIdRequest'

@UseInterceptors(HttpInterceptor)
@ApiTags('Exams')
@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @ApiOperation({
    summary: 'Rota para cadastrar uma nova prova.',
  })
  @ApiOkResponse({
    description: 'Prova criada com sucesso',
    type: CreatedExamBodyObjectResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro no corpo da requisição',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro Interno',
    type: ErrorResponse,
  })
  async store(
    @Body() createExamRequest: CreateExamRequest,
  ): Promise<HttpResponse> {
    const response = await this.examService.createExam(createExamRequest)
    return created(response)
  }

  @Get()
  @ApiOperation({
    summary: 'Retorna todas as provas.',
  })
  @ApiOkResponse({
    description: 'Retorna todas as provas',
    type: ExamBodyArrayResponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro no corpo da requisição',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro Interno',
    type: ErrorResponse,
  })
  async getAll(): Promise<HttpResponse> {
    const response = await this.examService.getAllExams()
    return ok(response)
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Rota para alterar uma prova pelo id.',
  })
  @ApiNoContentResponse({
    description: 'Alteracao feita com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Erro no corpo da requisição',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro Interno',
    type: ErrorResponse,
  })
  async update(
    @Param() examId: ExamIdRequest,
    @Body() createExamRequest: CreateExamRequest,
  ): Promise<HttpResponse> {
    await this.examService.updateById(examId, createExamRequest)
    return updated()
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Rota para deletar uma prova pelo id.',
  })
  @ApiNoContentResponse({
    description: 'Delete feito com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Erro no corpo da requisição',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro Interno',
    type: ErrorResponse,
  })
  async delete(@Param() examId: ExamIdRequest): Promise<HttpResponse> {
    await this.examService.deleteById(examId)
    return removed()
  }
}
