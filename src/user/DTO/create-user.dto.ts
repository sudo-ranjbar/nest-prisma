import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDTO {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @Length(5,20, {message: 'password must be at least 5 character'})
  password: string
}