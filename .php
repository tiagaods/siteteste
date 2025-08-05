<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Dados do formulário
$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$contato = $_POST['contato'] ?? '';
$cargo = $_POST['cargo'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';
$base = $_POST['base'] ?? '';
$assunto = $_POST['assunto'] ?? 'Novo currículo';
$destino = $_POST['base-email'] ?? 'seuemail@exemplo.com';

// Validação básica dos campos obrigatórios
if (empty($nome) || empty($email) || empty($base)) {
    http_response_code(400);
    echo "Preencha todos os campos obrigatórios.";
    exit;
}

// Processa o arquivo anexado
$arquivo = $_FILES['curriculo'] ?? null;
$anexo = '';
$permitidos = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
$tamanho_max = 2 * 1024 * 1024; // 2MB

if ($arquivo && $arquivo['error'] === UPLOAD_ERR_OK) {
    if (!in_array($arquivo['type'], $permitidos)) {
        http_response_code(400);
        echo "Tipo de arquivo não permitido. Envie apenas .doc ou .docx.";
        exit;
    }
    if ($arquivo['size'] > $tamanho_max) {
        http_response_code(400);
        echo "Arquivo muito grande. O limite é 2MB.";
        exit;
    }
    $anexo = $arquivo['tmp_name'];
    $anexo_nome = preg_replace('/[^a-zA-Z0-9.\-_]/', '', $arquivo['name']); // sanitiza nome
    $anexo_tipo = $arquivo['type'];
} else {
    http_response_code(400);
    echo "Arquivo de currículo não enviado ou inválido.";
    exit;
}

// Monta o corpo do e-mail
$body = "Nome: $nome\nE-mail: $email\nContato: $contato\nCargo: $cargo\nBase: $base\nMensagem: $mensagem";

// Envio do e-mail com anexo (simples, sem biblioteca externa)
$boundary = md5(time());
$headers = "From: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$message = "--$boundary\r\n";
$message .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= $body . "\r\n\r\n";

if ($anexo) {
    $file_content = chunk_split(base64_encode(file_get_contents($anexo)));
    $message .= "--$boundary\r\n";
    $message .= "Content-Type: $anexo_tipo; name=\"$anexo_nome\"\r\n";
    $message .= "Content-Disposition: attachment; filename=\"$anexo_nome\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $message .= $file_content . "\r\n\r\n";
}

$message .= "--$boundary--";

// Envia o e-mail
if (mail($destino, $assunto, $message, $headers)) {
    echo "Currículo enviado com sucesso!";
} else {
    http_response_code(500);
    echo "Erro ao enviar currículo.";
}
?>