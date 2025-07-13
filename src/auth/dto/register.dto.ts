import { IsEmail, IsString, Length } from "class-validator"

export class RegisterDTO {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  @Length(5,20, {message: 'password must be at least 5 character'})
  password: string
}