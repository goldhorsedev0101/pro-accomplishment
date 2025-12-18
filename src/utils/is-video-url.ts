export function isVideoUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;

  // Common video file extensions
  const videoExtensions = [
    'mp4',
    'mov',
    'wmv',
    'flv',
    'avi',
    'mkv',
    'webm',
    'mpeg',
    'mpg',
    '3gp',
    'ogv',
  ];

  try {
    const parsedUrl = new URL(url);
    const pathname = parsedUrl.pathname.toLowerCase();

    return videoExtensions.some((ext) => pathname.endsWith(`.${ext}`));
  } catch {
    // If it's not a valid URL, try checking as a plain string (like a relative path)
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some((ext) => lowerUrl.endsWith(`.${ext}`));
  }
}
