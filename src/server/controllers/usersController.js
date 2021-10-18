import User from "../models/usersModels";

exports.signIn = (req, res, next) => {
    const { password, email } = req.body;

    User.find({ email: email }, (err, user) => {

        if (err || user.length === 0) {
            res.status(404).json({ error: "No user was found with this email." });
        } else if (user.length > 0) { //Comparing password

            bcrypt.compare(password, user[0].password, (err, result) => {

                if (err) {
                    res.status(401).json({ error: "Authentication has failed!" });
                } else if (result) {
                    const userData = { // get from schemas
                        Email: user[0].userEmail,
                        ID: user[0].userId,
                        UserName: user[0].userName
                    };
                    const token = jwt.sign(userData, "MONGO_SECRET", { expiresIn: "1h" });
                    res.status(200).json({
                        message: "Authentication has been successful",
                        token: token,
                        userData,
                    });
                } else {
                    res.status(401).json({ error: "The password entered is incorrect!" });
                }
            });
        }
    }).catch((err) => res.status(500).json({ error: err }));
};