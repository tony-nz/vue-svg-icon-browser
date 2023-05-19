declare module "prettier" {
    export function format(
      source: string,
      options?: prettier.Options
    ): string;
  }