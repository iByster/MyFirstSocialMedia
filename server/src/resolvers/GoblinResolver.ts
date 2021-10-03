import path from 'path';
import { Arg, Query, Resolver } from 'type-graphql';
import { GoblinMask } from '../entities/GoblinMask';
import { base64Encoder } from '../utils/base64Encoder';

@Resolver()
export class GoblinResolver {
  @Query(() => String)
  logo() {
    const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo.png');
    const encodedImage = base64Encoder(logoPath);

    return encodedImage;
  }

  @Query(() => String)
  async mask(@Arg('goblinMask') goblinMask: number): Promise<String> {
    const golbinLegend = await GoblinMask.findOne(goblinMask);
    if (golbinLegend) {
      const chooseFate = path.join(
        __dirname,
        '..',
        'public',
        'images',
        'users',
        `${golbinLegend.photo}`
      );
      const encodedFate = base64Encoder(chooseFate);
      return encodedFate;
    }

    return 'There is no desteny for you';
  }
}
