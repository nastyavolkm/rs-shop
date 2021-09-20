export interface ILocation {
  ip: string;
  country: string;
  loc: string;
  city: string;
}

export interface ILocationRus {
  results: {
    components: {
      city: string;
    };
  }[];
}
