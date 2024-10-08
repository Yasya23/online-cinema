import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { RatingModel } from 'src/models/rating.model';
import { MovieModule } from '../movie/movie.module';
import { MovieModel } from 'src/models/movie.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: RatingModel,
        schemaOptions: {
          collection: 'Rating',
        },
      },
      MovieModel,
    ]),
    MovieModule,
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
