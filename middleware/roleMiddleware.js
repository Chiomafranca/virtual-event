exports.isAdmin = (req, res, next) => {
    // Check if the user's role is "admin"
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Requires Admin Role" });
    }
    next();
};

