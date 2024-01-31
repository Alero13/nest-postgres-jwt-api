import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dts';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    /* async register( registerDto: RegisterDto) { */
    async register( { name, email, password }: RegisterDto) {

        /* await this.usersService.create(registerDto) */

        /* return 'register' */

        /* return await this.usersService.create(registerDto); */

        const user =  await this.usersService.findOneByEmail(email);
        if (user) {
            throw new BadRequestException('El Usuario ya existe')
        }

       /* return  */ await this.usersService.create( 
        {
            name, 
            email, 
            password: await bcryptjs.hash(password, 10)
        } );
        return {
            name,
            email
            
        }

    }
    
    async login( { email, password }: LoginDto) {
        /* return 'login' */

        /* const user =  await this.usersService.findOneByEmail(email); */
        const user =  await this.usersService.findByEmailWithPassword(email);
        if (!user) {
            throw new UnauthorizedException('Email no es correcto')
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password incorrecto')
        }

        /* const payload = { email: user.email, sub: user.id, role: user.role }; */
        const payload = { email: user.email, role: user.role };

        const token = await this.jwtService.signAsync(payload)

        /* return user */
        return { token, email }
    }

    /* async profile({ email, role} : { email:string, role: string}) { */
    async profile({ email} : { email:string, role: string}) {
       /* { return { email, rol }}; */

       /* if (role !== 'admin') {
        throw new UnauthorizedException(
            'No esta autorizado a realizar esto',);
       } */
       
        return await this.usersService.findOneByEmail(email);
    }
    
}
