/**
 * <div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
 * <span>Built-in <b>MonoCloud</b> authentication.</span>
 * <a href="https://www.monocloud.com/">
 *   <img style={{display: "block"}} src="https://authjs.dev/img/providers/monocloud.svg" height="48" />
 * </a>
 * </div>
 *
 * @module providers/monocloud
 */
import type { OAuthConfig, OAuthUserConfig } from "./index.js"

type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? object extends U
  ? never
  : U
  : never;

type UnknownObject = Record<string, unknown>;

type Override<T1, T2> = Omit<T1, keyof Omit<T2, keyof KnownKeys<T2>>> & T2;

type Address<ExtendedAddress extends object = UnknownObject> = Override<
  {
    formatted?: string;
    street_address?: string;
    locality?: string;
    region?: string;
    postal_code?: string;
    country?: string;
  },
  ExtendedAddress
>;

export interface MonoCloudProfile<ExtendedAddress extends object = UnknownObject> extends Record<string, any> {
  sub: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  updated_at?: number;
  address?: Address<ExtendedAddress>;
  acr?: string;
  amr?: string[];
  at_hash?: string;
  aud: string | string[];
  auth_time?: number;
  azp?: string;
  c_hash?: string;
  exp: number;
  iat: number;
  iss: string;
  nonce?: string;
  s_hash?: string;
  [key: string]: unknown;
}

/**
 * Integrate MonoCloud Authentication into your application.
 *
 * ### Setup
 *
 * #### Callback URL
 * ```
 * https://example.com/api/auth/callback/monocloud
 * ```
 *
 * #### Configuration
 *
 * Import the provider and configure it in your **Auth.js** initialization file:
 *
 * ```ts title="pages/api/auth/[...nextauth].ts"
 * import NextAuth from "next-auth"
 * import MonoCloud from "next-auth/providers/auth0"
 *
 * export default NextAuth({
 *   providers: [
 *     MonoCloud({
 *       clientId: process.env.AUTH_MONOCLOUD_ID,
 *       clientSecret: process.env.AUTH_MONOCLOUD_SECRET,
 *     }),
 *   ],
 * })
 * ```
 *
 * ### Resources
 *
 *  - [MonoCloud Documentation](https://docs.monocloud.com/)
 *
 * ### Notes
 *
 * By default, Auth.js assumes that the MonoCloud provider is
 * based on the [Open ID Connect](https://openid.net/specs/openid-connect-core-1_0.html) specification.
 *
 * :::tip
 *
 * The MonoCloud provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/monocloud.ts).
 * To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/configuring-oauth-providers).
 *
 * :::
 *
 * :::info **Disclaimer**
 *
 * If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).
 *
 * Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
 * the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
 * we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).
 *
 * :::
 */
export default function MonoCloud<P extends MonoCloudProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "monocloud",
    name: "MonoCloud",
    type: "oidc",
    style: { bg: "#000", text: "#fff" },
    checks: ["pkce", "state"],
    options,
  }
}
