export class HelperClass {
  static areAllFieldsFilled(obj: any): boolean {
    return Object.values(obj).every(value => !!value);
  }

  static returnTranslatedErrorMessage(error: any): string {
    
    const errorMessagesMap: { [key: string]: string } = {
      "The email field must be a valid email address.": "Forneça um e-mail válido.",
      "The email field must be a valid email address. (and 1 more error)": "Forneça um e-mail válido.",
      "The email field must be a valid email address. (and 2 more error)": "Forneça um e-mail válido.",
      "The email has already been taken.": "Esse e-mail já está cadastrado.",
      "The email has already been taken. (and 1 more error)": "Esse e-mail já está cadastrado.",
      "The email has already been taken. (and 2 more error)": "Esse e-mail já está cadastrado.",
      "The password field must be at least 8 characters.": "A senha deve ter pelo menos 8 caracteres.",
      "The provided credentials are incorrect.": "Os dados informados estão incorretos.",
      "The password field confirmation does not match.": "As senhas devem coincidir."
    };
  
    return errorMessagesMap[error.message];
  }  
}
