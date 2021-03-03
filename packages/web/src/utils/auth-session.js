import SsrCookie from "ssr-cookie";
import { getApiToken } from "./get-api-token";
import config from "config";
import WebLocalStorage from "web-local-storage";
const COOKIE_USER = "user-token";
const COOKIE_ORG = "user-org";

class AuthSession {
  constructor(req = null, res = null) {
    if (config.disableCookie) {
      this.cookie = new WebLocalStorage();
    } else this.cookie = new SsrCookie(req, res);
  }
  static create(req, res) {
    return new AuthSession(req, res);
  }
  get() {
    const token = this.cookie.get(COOKIE_USER);
    if (!token) return null;
    const org = this.cookie.get(COOKIE_ORG);
    return { token, org };
  }
  set(token, org = null) {
    this.cookie.set(COOKIE_USER, token, { expires: 1 * config.authExpires });
    this.cookie.set(COOKIE_ORG, org, { expires: 1 * config.authExpires });
  }
  clear() {
    this.cookie.remove(COOKIE_USER);
    this.cookie.remove(COOKIE_ORG);
  }

  getApiToken() {
    const session = this.get();
    if (!session) return null;
    return getApiToken(session.token, session.org);
  }
}

export default AuthSession;
