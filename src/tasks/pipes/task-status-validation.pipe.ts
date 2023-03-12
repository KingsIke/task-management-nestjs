import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../Crud/task.model";

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ];
    transform(value: any) {
        value = value.toUpperCase()
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid Status`)

        }

        return value
    }
    private isStatusValid(status: any) {
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1
    }
}