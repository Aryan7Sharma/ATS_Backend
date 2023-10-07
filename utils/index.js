const bcrypt = require("bcryptjs");
const generateNewPassword = () => {
    const length = 8;
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
  }

  
  const hashPassword = async (plainPassword) => {
      try {
          const hashedPassword = await bcrypt.hash(plainPassword, 10);
          return hashedPassword;
      } catch (error) {
          throw error;
      }
  }
  

module.exports = {
    generateNewPassword,
    hashPassword
}