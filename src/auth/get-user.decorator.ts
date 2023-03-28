// import { createParamDecorator } from "@nestjs/common";
// import { UserEntity } from "./user.entity";

// export const GetUser = createParamDecorator((data, req): UserEntity => {
//     return req.user
// })

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: unknown, req: ExecutionContext) => {
        const request = req.switchToHttp().getRequest();
        return request.user;
    },
);