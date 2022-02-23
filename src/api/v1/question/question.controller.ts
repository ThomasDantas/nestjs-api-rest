import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common'
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
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
import { CreateQuestionRequest } from './infra/request/CreateQuestionRequest'
import { CreatedQuestionOkReponse } from './infra/response/CreatedQuestionOkResponse'
import { QuestionService } from './question.service'
import { ExamIdRequest } from './infra/request/ExamIdRequest'
import { QuestionIdRequest } from './infra/request/QuestionIdRequest'
import { Get } from '@nestjs/common'

@UseInterceptors(HttpInterceptor)
@ApiTags('Questions')
@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post(':id')
  @ApiOperation({
    summary: 'Rota para cadastrar uma nova questao.',
  })
  @ApiOkResponse({
    description: 'Questao criada com sucesso',
    type: CreatedQuestionOkReponse,
  })
  @ApiBadRequestResponse({
    description: 'Erro no corpo da requisição',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro Interno',
    type: ErrorResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'id exam',
    example: 'e784f753-2b01-4604-96f2-c483bd3d8510',
  })
  async store(
    @Param() examId: ExamIdRequest,
    @Body() createQuestionRequest: CreateQuestionRequest,
  ): Promise<HttpResponse> {
    const response = await this.questionService.createQuestions(
      examId,
      createQuestionRequest,
    )
    return created(response)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Rota para retornar todas questoes.',
  })
  @ApiOkResponse({
    description: 'Questoes',
    type: [CreatedQuestionOkReponse],
  })
  @ApiBadRequestResponse({
    description: 'Erro no corpo da requisição',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro Interno',
    type: ErrorResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'id exam',
    example: 'e784f753-2b01-4604-96f2-c483bd3d8510',
  })
  async getAll(@Param() examId: ExamIdRequest): Promise<HttpResponse> {
    const response = await this.questionService.getAllByExam(examId)
    return ok(response)
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Rota para alterar uma questao.',
  })
  @ApiNoContentResponse({
    description: 'Questao alterada com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Erro no corpo da requisição',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro Interno',
    type: ErrorResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'id question',
    example: 'e784f753-2b01-4604-96f2-c483bd3d8510',
  })
  async update(
    @Param() questionId: QuestionIdRequest,
    @Body() createQuestionRequest: CreateQuestionRequest,
  ): Promise<HttpResponse> {
    await this.questionService.updateQuestionById(
      questionId,
      createQuestionRequest,
    )
    return updated()
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Rota para deletar uma questao.',
  })
  @ApiNoContentResponse({
    description: 'Questao deletada com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Erro no corpo da requisição',
    type: ErrorResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro Interno',
    type: ErrorResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'id question',
    example: 'e784f753-2b01-4604-96f2-c483bd3d8510',
  })
  async delete(@Param() questionId: QuestionIdRequest): Promise<HttpResponse> {
    await this.questionService.deleteQuestionById(questionId)
    return removed()
  }
}
