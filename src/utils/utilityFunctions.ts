export const validateOregonStateEmail = (email: string): boolean => {
    const oregonStateEmailPattern = /^[a-zA-Z0-9._%+-]+@oregonstate\.edu$/;
    return oregonStateEmailPattern.test(email);
  }
  