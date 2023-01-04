export function validateImg(data) {
  // return false if data isn't available
  if (!data) return { result: false, errorCode: `img` };

  // checking if image has acceptable extension
  const { type, size } = data;
  const acceptableExt = ["png", "jpg", "jpeg"];
  const containsItem = acceptableExt.some((item) => type.includes(item));

  // return false if image doesn't have acceptable extension
  if (!containsItem) return { result: false, errorCode: `img` };

  // return false if image size is more then 2mb
  if (size * 0.000001 > 2) return { result: false, errorCode: `size` };

  // return true otherwise
  return { result: true, errorCode: null };
}
