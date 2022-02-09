import {
  profileImgFox,
  profileImgGoof,
  profileImgLady,
  profileImgWar,
} from '../images';

export const getImage = (imageConst: string) => {
  return (
    (imageConst === 'goof.png' && profileImgGoof) ||
    (imageConst === 'fox.png' && profileImgFox) ||
    (imageConst === 'war.png' && profileImgWar) ||
    (imageConst === 'lady.png' && profileImgLady)
  );
};

export const getRandomImage = () => {
  const imgs = ['goof.png', 'fox.png', 'war.png', 'lady.png'] as const;

  return imgs[Math.floor(Math.random() * 4)];
};

export const getImageDBRef = (imageName: string) => {
  return (
    (imageName === 'goof.png' && 4) ||
    (imageName === 'fox.png' && 1) ||
    (imageName === 'war.png' && 2) ||
    (imageName === 'lady.png' && 3)
  );
};
