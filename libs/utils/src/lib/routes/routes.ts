export const getPathnameDisplayName = (pathname: string): string => {
  // Split the pathname into segments
  const segments = pathname.split('/');

  // Filter out empty segments and remove the leading slash
  const cleanedSegments = segments.filter(segment => segment !== '');

  // Check if there are at least two segments
  if (cleanedSegments.length >= 2) {
    // Take the first two segments and replace hyphens with spaces
    const displayName = cleanedSegments.slice(0, 1).join('/').replace(/-/g, ' ');

    // Capitalize the first letter of each word
    return displayName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  } else {
    const displayName = pathname.slice(1).replace(/-/g, ' ');
    // If there are fewer than two segments, return an empty string
    return displayName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
};
