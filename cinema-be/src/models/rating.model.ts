import { prop, Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { MovieModel } from './movie.model';
import { UserModel } from './user.model';

export interface RatingModel extends Base {}

export class RatingModel extends TimeStamps {
  @prop()
  value: number;

  @prop({ ref: () => UserModel })
  userId?: Ref<UserModel>;

  @prop({ ref: () => MovieModel })
  movieId?: Ref<MovieModel>;
}
