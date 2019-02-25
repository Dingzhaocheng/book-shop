const formidable = require("formidable");
exports.orderBooks = function (req, res, next) {
    //得到用户填写的东西
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        let username = fields.name;
        let userphone = fields.phone;
        let useraddress = fields.address;
        let userselected = fields.selected;
        console.log(username,userphone,useraddress,userselected);
    });
    res.send("success");
};