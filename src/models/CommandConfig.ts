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
};
