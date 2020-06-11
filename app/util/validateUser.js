exports.validateForm = (req, res) => {
    const { nickname, password } = req.body;

    if (!nickname) {
        res.status(400).json({ message: "nickname은 비어있어선 안됩니다." });
        return false;
    }

    if (!password) {
        res.status(400).json({ message: "password는 비어있어선 안됩니다." });
        return false;
    }

    if (password.length < 6) {
        res.status(400).json({ message: "password는 비어있어선 안됩니다." });
        return false;
    }

    if (!RegExp('(?=.*[a-zA-Z])(?=.*[\\d])(?=.*[~!@#$%^&*?]).*').test(password)) {
        res.status(400).json({ message: 'password는 영어, 숫자 및 특수문자를 포함하고 있어야 합니다.' })
        return false;
    }
    return true;
};