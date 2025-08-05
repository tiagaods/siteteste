const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Criar pasta uploads se não existir
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Configuração do multer para upload
const upload = multer({ 
    dest: 'uploads/',
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo não permitido. Envie apenas .doc ou .docx.'));
        }
    }
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para trabalhe conosco
app.get('/trabalhe-conosco', (req, res) => {
    res.sendFile(path.join(__dirname, 'trabalhe-conosco.html'));
});

// Rota para enviar currículo
app.post('/enviar-curriculo', upload.single('curriculo'), (req, res) => {
    try {
        const { nome, email, contato, cargo, base, mensagem, assunto } = req.body;
        const baseEmail = req.body['base-email'];
        const cidades = req.body['cidades-selecionadas'];
        const abrangencia = req.body['abrangencia-selecionada'];
        
        // Validação básica
        if (!nome || !email || !base || !req.file) {
            return res.status(400).send('Preencha todos os campos obrigatórios e anexe o currículo.');
        }

        // Configurar nodemailer
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER || 'seu-email@gmail.com',
                pass: process.env.EMAIL_PASS || 'sua-senha-app'
            }
        });

        // Corpo do e-mail
        let emailBody = `
Novo currículo recebido pelo site:

Nome: ${nome}
E-mail: ${email}
Contato: ${contato || 'Não informado'}
Cargo: ${cargo}
Base: ${base}`;

        if (abrangencia) {
            emailBody += `\nAbrangência: ${abrangencia}`;
        }
        
        if (cidades) {
            emailBody += `\nCidades: ${cidades}`;
        }
        
        emailBody += `\nMensagem: ${mensagem || 'Nenhuma mensagem adicional'}`;

        const mailOptions = {
            from: process.env.EMAIL_USER || 'seu-email@gmail.com',
            to: baseEmail || 'tiago.bh.d@gmail.com',
            subject: assunto || `Novo currículo - ${cargo}`,
            text: emailBody,
            attachments: [{
                filename: req.file.originalname,
                path: req.file.path
            }]
        };

        // Enviar e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            // Limpar arquivo temporário
            if (req.file && req.file.path) {
                fs.unlink(req.file.path, (err) => {
                    if (err) console.error('Erro ao deletar arquivo:', err);
                });
            }

            if (error) {
                console.error('Erro ao enviar e-mail:', error);
                res.status(500).send('Erro ao enviar currículo: ' + error.message);
            } else {
                console.log('E-mail enviado:', info.response);
                res.send('Currículo enviado com sucesso!');
            }
        });

    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro interno do servidor: ' + error.message);
    }
});

// Middleware para tratar erros do multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).send('Arquivo muito grande. O limite é 2MB.');
        }
    }
    if (error.message) {
        return res.status(400).send(error.message);
    }
    next();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});