export function getApiToken(token, org) {
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      "X-Organization": org,
    };
  } else {
    return {};
  }
}
