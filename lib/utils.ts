const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function normalizeBasePath(path: string): string {
  if (!path) return "";
  const withoutTrailingSlash = path.endsWith("/") ? path.slice(0, -1) : path;
  return withoutTrailingSlash.startsWith("/")
    ? withoutTrailingSlash
    : `/${withoutTrailingSlash}`;
}

export function prefixAssetPath(path: string): string {
  if (
    !path ||
    /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(path) ||
    path.startsWith("data:") ||
    path.startsWith("blob:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const normalizedBasePath = normalizeBasePath(basePath);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (
    !normalizedBasePath ||
    normalizedPath === normalizedBasePath ||
    normalizedPath.startsWith(`${normalizedBasePath}/`)
  ) {
    return normalizedPath;
  }

  return `${normalizedBasePath}${normalizedPath}`;
}