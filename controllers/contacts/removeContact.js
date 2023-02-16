const { Contact } = require("../../models");

const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id = ${contactId} was delete`,
    data: {
      result: contact,
    },
  });
};

module.exports = removeContact;
