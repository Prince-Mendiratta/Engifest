const User = require('../models/auth')
const { errorHandler } = require('../helpers/dbError');
const { join } = require('path')
const { createReadStream } = require('fs')
const latex = require('node-latex')

exports.generateTicket = (req, res) => {
    // res.send("ok")
    const input = createReadStream(join(__dirname, 'input.tex'))
    const options = {
        cmd: 'xelatex',
        args: ['-jobname=texput'],
        errorLogs: join(__dirname, 'latexerrors.log') // This will write the errors to `latexerrors.log`
    }
    const pdf = latex(input, options)

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Ticket.pdf');
    pdf.pipe(res)
}