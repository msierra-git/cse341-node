displayStartMessage = (req, res) => {
   const data = 'Hello, A. Michael Sierra!!!';
   res.status(200).send(data);
};

module.exports = {
   displayStartMessage,
};