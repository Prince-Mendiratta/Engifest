const User = require('../models/auth')
const { errorHandler } = require('../helpers/dbError');
const { join } = require('path')
const { createReadStream, readFile, writeFile } = require('fs')
const latex = require('node-latex')
const jwt = require('jsonwebtoken');

exports.generateTicket = (req, res) => {
    // res.send("ok")
    var token = req.cookies.auth;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, function (err, token_data) {
            if (err) {
                return
            } else {
                readFile(join(__dirname, 'input.tex'), 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    var result = data.replace(/bruhh/g, token_data.name);

                    writeFile(join(__dirname, 'input2.tex'), result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                    const input = createReadStream(join(__dirname, 'input2.tex'))
                    const options = {
                        cmd: 'xelatex',
                        args: ['-jobname=texput'],
                        errorLogs: join(__dirname, 'latexerrors.log') // This will write the errors to `latexerrors.log`
                    }
                    const pdf = latex(input, options)

                    res.setHeader('Content-Type', 'application/pdf');
                    res.setHeader('Content-Disposition', 'attachment; filename=Ticket.pdf');
                    pdf.pipe(res)
                });
            }
        });
    } else {
        return res.redirect('/login');
    }
}