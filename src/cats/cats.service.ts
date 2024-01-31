import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from '../breeds/entities/breed.entity';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
    
  ) {}

  async  create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    /* return 'This action adds a new cat'; */
    
    //const cat = this.catRepository.create(createCatDto) //Instanciando
    //return await this.catRepository.save(createCatDto) //Envio directo del createCatDto

    /* const Raza = await this.breedRepository.findOneBy( {name: createCatDto.breed} );

    if (!Raza) {
      throw new BadRequestException('No existe esa raza')
    } */

    const Raza = await this.validateBreed(createCatDto.breed)

    return await this.catRepository.save({
      ...createCatDto,
      /* Raza}); */
      breed: Raza,
      userEmail: user.email});
    
  }

  async findAll( user: UserActiveInterface ) {
    if (user.role === Role.ADMIN) {
      return await this.catRepository.find()
    }
    /* return `This action returns all cats`; */
    return await this.catRepository.find({
      where : { userEmail: user.email },
    })
  }

  async findOne(id: number, user: UserActiveInterface) {

    const cat = await this.catRepository.findOneBy( { id });
    if (!cat) {
      throw new BadRequestException(' El gato no existe ')
    }

    /* if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException()
    } */
    this.validateOwnership( cat, user)

    /* return `This action returns a #${id} cat`; */

    /* return this.catRepository.findOneBy({id}) */
    return cat
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: UserActiveInterface) {
    /* return `This action updates a #${id} cat`; */

    /* return this.catRepository.update(id , updateCatDto, user) */
    /* const cat = await this.catRepository.findOne( { id }) */
    await this.findOne( id, user)
    //const breed = await this.validateBreed(updateCatDto.breed)

    return await this.catRepository.update( id, {
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined,
      userEmail: user.email
    })
  }

  async remove(id: number, user: UserActiveInterface) {
    /* return `This action removes a #${id} cat`; */

    await this.findOne(id, user)
    return this.catRepository.softDelete( {id} )
    /* return this.catRepository.softRemove( {id} ) */
  
  }

  private validateOwnership(cat: Cat, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException()
    }
  }

  private async validateBreed( breed: string) {
    const razaEntidad = await this.breedRepository.findOneBy( { name: breed})
    if (!razaEntidad) {
      throw new BadRequestException('No existe la raza')
    }
    return razaEntidad;
  }
}
