import { Body, Controller, Post } from '@nestjs/common'
import { ContasReceberService } from './contas-receber.service'
import { CreateContaReceberDto } from './dto/create-conta-receber.dto'

@Controller('contas-receber')
export class ContasReceberController {
    constructor(private readonly service: ContasReceberService) { }

    @Post()
    create(@Body() data: CreateContaReceberDto) {
        return this.service.create(data)
    }
}