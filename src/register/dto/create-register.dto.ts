export class CreateRegisterDto {
    readonly name: string;
    readonly lastName: string;
    readonly birthDate: string;
    readonly email: string;
    readonly password: string;
    readonly isAdmin: number;
}