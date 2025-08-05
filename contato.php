<?php
$destino = "financeiro@portoguimaraes.com.br"; // E-mail que vai receber
$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$mensagem = $_POST['mensagem'] ?? '';
$assunto = "Contato pelo site";

$body = "Nome: $nome\nE-mail: $email\nMensagem: $mensagem";
$headers = "From: $email";

if (mail($destino, $assunto, $body, $headers)) {
    echo "Mensagem enviada com sucesso!";
} else {
    echo "Erro ao enviar mensagem.";
}
?>