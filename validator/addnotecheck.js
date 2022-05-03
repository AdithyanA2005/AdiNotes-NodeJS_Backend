const { check } = require("express-validator");
const {
  NOTE_TITLE_MINIMUM_LENGTH,
  NOTE_TITLE_MAXIMUM_LENGTH,
  NOTE_DESCRIPTION_MINIMUM_LENGTH,
  NOTE_DESCRIPTION_MAXIMUM_LENGTH,
} = require("../utilities/constants");

const addNoteChecksArray = [
  check("title")
    // Checks that title is not empty
    .notEmpty()
    .withMessage("Title cannot remain empty")
    .bail()

    // Check that title has a minimum length of NOTE_TITLE_MINIMUM_LENGTH characters
    .isLength({ min: NOTE_TITLE_MINIMUM_LENGTH })
    .withMessage(`Title should atleast ${NOTE_TITLE_MINIMUM_LENGTH} character long`)
    .bail()

    // Check that title length is under NOTE_TITLE_MAXIMUM_LENGTH characters
    .isLength({ max: NOTE_TITLE_MAXIMUM_LENGTH })
    .withMessage(`Title should be under ${NOTE_TITLE_MAXIMUM_LENGTH} character`)
    .bail(),

  check("description")
    // Checks that description is not empty
    .notEmpty()
    .withMessage("Description cannot remain empty")
    .bail()

    // Check that description has a minimum length of NOTE_TITLE_MINIMUM_LENGTH characters
    .isLength({ min: NOTE_DESCRIPTION_MINIMUM_LENGTH })
    .withMessage(`Description should atleast ${NOTE_DESCRIPTION_MINIMUM_LENGTH} character long`)
    .bail()

    // Check that description length is under NOTE_TITLE_MAXIMUM_LENGTH characters
    .isLength({ max: NOTE_DESCRIPTION_MAXIMUM_LENGTH })
    .withMessage(`Description should be under ${NOTE_DESCRIPTION_MAXIMUM_LENGTH} character`)
    .bail(),
];

module.exports = addNoteChecksArray;
