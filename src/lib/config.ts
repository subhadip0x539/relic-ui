import { defaults } from "@/constants/defaults.const";
import type { Config } from "@/types/config";

export class ConfigBuilder {
  private config: Partial<Config> = {};

  api(baseURL: string): this {
    this.config.api = { baseURL };
    return this;
  }
  auth(refreshWindowMs: number): this {
    this.config.auth = { refreshWindowMs };
    return this;
  }

  env(): this {
    return this.api(
      import.meta.env.VITE_API_BASE_URL || window.location.origin,
    ).auth(
      Number(import.meta.env.VITE_AUTH_REFRESH_WINDOW_MS) ||
        defaults.AUTH_REFRESH_WINDOW_MS,
    );
  }

  build(): Config {
    return this.config as Config;
  }
}
