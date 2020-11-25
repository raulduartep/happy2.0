import Image from '@models/ImageModel';

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `${process.env.BASE_URL}/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
