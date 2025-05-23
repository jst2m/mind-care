import { IsEmail, IsString, MinLength, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class SignupDto {
  @IsEmail() email: string;

  @IsString() @MinLength(8) motDePasse: string;

  @IsString() prenom: string;
  @IsString() nom: string;

  @IsOptional() @IsDateString() dateNaissance?: string;

  @IsEnum(['Homme','Femme','Ne préfère pas dire']) sexe: string;
  @IsEnum(['patient','professionnel'])                role: string;
}
