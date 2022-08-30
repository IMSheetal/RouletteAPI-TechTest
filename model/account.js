const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    user_id: { type: String, default: null },
    email: { type: String, default: null },
    amountWin: { type: String, default: null },
    betAmount: { type: String },
    betstatus: { type: String }
});

module.exports = mongoose.model("account", accountSchema);