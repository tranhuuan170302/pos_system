import Joi from "joi";
//**Simple method to Convert a string to slug */
export const slugify = (val) => {
  if (!val) return "";
  return String(val)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
};

// Custom validator cho ObjectId để sử dụng với Joi
export const objectId = () => Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid', { message: 'Invalid ObjectId' });
  }
  return value;
}, 'ObjectId Validation');
