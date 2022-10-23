export type CommandConfig = {
  title: string;
  description: string;
  usage: string[];
  options: CommandOptions[];
};

export type CommandOptions = {
  minified: string;
  normal: string;
  description: string;
  default: string;
  type: CommandTypes;
  required: boolean;
};

export enum CommandTypes {
  string,
  boolean,
  number,
}

export type ArgsOption = {
  minified: string;
  value: string | boolean | number;
};
