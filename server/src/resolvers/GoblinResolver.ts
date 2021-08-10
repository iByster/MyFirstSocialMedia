import { Query, Resolver } from 'type-graphql';
import path from 'path';
import { base64Encoder } from '../utils/base64Encoder';

@Resolver()
export class GoblinResolver {
  @Query(() => String)
  logo() {
    const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo.png');
    const encodedImage = base64Encoder(logoPath);

    return encodedImage;
  }
}
