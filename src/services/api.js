import { Helper } from './helper.js';


export class Api {
  constructor() {
    this.baseURL = 'https://fortniteapi.io/v2/shop?lang=ru';
    this.apiKey = import.meta.env.VITE_API_KEY;
  }

  getResource = async () => {
    try {
      const resource = await fetch(this.baseURL, {
        headers: {
          Authorization: this.apiKey,
        }
      }).then((response) => response.json());

      return resource;
    } catch(error) {
      console.log(`Error fetch to url ${this.baseURL}`);
    }

  }

  getGoods = async () => {
    const data = this.getResource()
      .then((data) => data?.shop.map((item) => {
        return this.createGoodsItem(item);
      }) || []);

      return data;
  }

  createGoodsItem(item) {
    return {
      id: `${item.mainId}${Helper.random(1, 100)}`,
      title: item.displayName,
      description: item.displayDesctiption,
      price: item.price.regularPrice,
      img: item.displayAssets[0]?.full_background,
      count: 1,
    };
  }

}