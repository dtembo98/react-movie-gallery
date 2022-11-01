import { BASE_IMAGE_URL, IMAGE_NOT_FOUND, IMAGE_SIZE } from "./constants";

type IMAGE_SIZE_TYPE = keyof typeof IMAGE_SIZE;

export const imageExtractor = (
  size: IMAGE_SIZE_TYPE,
  path: string | null
): string => {
  const fullImageUlr = BASE_IMAGE_URL + IMAGE_SIZE[size] + path;
  if (!path) {
    return IMAGE_NOT_FOUND;
  }
  return fullImageUlr;
};
