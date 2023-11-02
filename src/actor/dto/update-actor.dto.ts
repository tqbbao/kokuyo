import { IsNotEmpty } from "class-validator";


export class UpdateActorDTO{
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    lastUpdate?: Date;
}