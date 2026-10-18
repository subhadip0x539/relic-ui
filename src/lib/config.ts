import type { Config } from "@/types/config";

export class ConfigBuilder {
  private config: Partial<Config> = {};

  api(baseURL: string): this {
    this.config.api = { baseURL };
    return this;
  }

  env(): this {
    return this.api(
      import.meta.env.VITE_API_BASE_URL || window.location.origin,
    );
  }

  build(): Config {
    return this.config as Config;
  }
}
