import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dts';
//import { Request } from 'express';
import { Role } from '../common/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

//interface RequestWithUser extends Request {
   /*  user: {
        email: string,
        role: string
    }
} */

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ) {

        //console.log(registerDto)

        /* return 'register' */
        return this.authService.register(registerDto);
    }
    
    @Post('login')
    login( 
        @Body() 
        loginDto: LoginDto,
        
    ) {
        /* return 'login' */
        return this.authService.login(loginDto);
    }

   /*  @Get('profile') */
    /* @Roles('admin') */
    /* @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)  */
    /* profile(
        @Request()
        req,
    ) */
    /* profile( */
        /* @Req() req: Request & { user: { email: string, role: string }}, */
       /*  @Req() req: RequestWithUser,
    )  *//* { */
        /* return 'Profile'; */
        /* return req.user; */
        /* return this.authService.profile( /* { */
           /*  email: req.user.email,
            role: req.user.role
        } */ /* req.user) */
   /*  }  */
    
   @ApiBearerAuth()
    @Get('profile')
    @Auth(Role.USER) 
    profile(
        @ActiveUser() 
        user: UserActiveInterface
        
        //@Req() req: RequestWithUser,
    ) {
        console.log(user)
        /* return this.authService.profile( req.user) */
        return this.authService.profile(user);
    }
}
