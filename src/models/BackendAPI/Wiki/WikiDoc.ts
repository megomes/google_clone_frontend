export type WikiDoc = {
  _index: Index;
  _id: string;
  _score: number;
  _source: Source;
};

export type Index = {
  Wiki: string;
};

export type Source = {
  title: string;
  href: string;
};

export type Type = {
  Doc: string;
};

export type WikiDocResponse = {
  data: WikiDoc[];
};
