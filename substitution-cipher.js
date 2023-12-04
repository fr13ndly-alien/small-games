function encrypt(message, key) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    message = message.toUpperCase();
    key = key.toUpperCase();

    let encryptedMessage = "";

    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char);
            encryptedMessage += key[index];
        } else {
            encryptedMessage += char;
        }
    }

    return encryptedMessage;
}

// Example usage:
const originalMessage = "SAC8TRANHUNGDAOPHUONGPHAMNGULAO";
const encryptionKey = "QWERTYUIOPASDFGHJKLZXCVBNM";

const encryptedMessage = encrypt(originalMessage, encryptionKey);
console.log("Encrypted Message:", encryptedMessage);
