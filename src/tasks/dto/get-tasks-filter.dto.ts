import { TaskStatus } from "../task-status.enums";
// import { IsOptional, IsIn, IsNotEmpty } from 'class-validator'
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator'



export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;


}