import config from '../../tailwind.config';
import { Theme } from '@aws-amplify/ui-react';

type ColorConfig = {
  [key: string]: string;
};

const colors: ColorConfig = (config.theme?.extend?.colors as ColorConfig) ?? {};

// Helper function to safely get color values
const getColor = (colorName: string): string => colors[colorName] ?? '#000000';

export const lightTheme:Theme = {
  name: 'light-theme',
  tokens: {
    components: {
      button: {
        primary: {
          backgroundColor: {value: getColor('purple-accent')},
          _hover: {
            backgroundColor: {value: getColor('purple-accent-hover')}
          },
        },
        link: {
          color: {value: getColor('purple-accent')},
          _hover: {
            backgroundColor: 'none',
            color: { value: getColor('purple-accent') },
          },
        },
      },
      tabs: {
        item: {
          color: {value: getColor('default-text-black')},
          _active: {
            color: {value: getColor('purple-accent-hover')}
          },
          _hover: {
            color: { value: getColor('purple-accent') },
          },
        },
      }
    },
    colors: {
      background: {
        primary: { value: getColor('page-light') },
        secondary: { value: getColor('nav-light') },
      },
      font: {
        interactive: { value: getColor('purple-accent') },
      },
      brand: {
        primary: {
          10: { value: getColor('light-purple') },
          80: { value: getColor('purple-accent') },
          90: { value: getColor('purple-accent-hover') },
          100: { value: getColor('dark-purple-accent') },
        },
      },
      neutral: {
        10: { value: getColor('default-text-black') },
      },
      red: {
        60: { value: getColor('error-red') },
      },
      green: {
        60: { value: getColor('success-green') },
      },
    },
  },
};

export const darkTheme = {
  name: 'dark-theme',
  tokens: {
    components: {
      button: {
        primary: {
          backgroundColor: {value: getColor('purple-accent')},
          _hover: {
            backgroundColor: {value: getColor('purple-accent-hover')}
          }
        },
        link: {
          color: {value: getColor('purple-accent')},
          _hover: {
            backgroundColor: 'none',
            color: { value: getColor('purple-accent') },
          },
        },
      },
      tabs: {
        item: {
          color: {value: getColor('default-text-white')},
          _active: {
            color: {value: getColor('purple-accent-hover')}
          },
          _hover: {
            color: { value: getColor('purple-accent') },
          },
        },
      }
    },
    colors: {
      background: {
        primary: { value: getColor('page-dark') },
        secondary: { value: getColor('default-text-white') },
      },
      font: {
        interactive: { value: getColor('dark-purple-accent') },
        primary: { value: getColor('default-text-white') },
      },
      brand: {
        primary: {
          10: { value: getColor('dark-purple-secondary') },
          80: { value: getColor('dark-purple-accent') },
          90: { value: getColor('purple-accent') },
          100: { value: getColor('purple-accent-hover') },
        },
      },
      neutral: {
        10: { value: getColor('default-text-white') },
        20: { value: getColor('default-text-white') },
        40: { value: getColor('default-text-white') },
        60: { value: getColor('default-text-white') },
        80: { value: getColor('default-text-white') },
        90: { value: getColor('default-text-white') },
        100: { value: getColor('default-text-white') },
      },
      red: {
        60: { value: getColor('error-red') },
      },
      green: {
        60: { value: getColor('success-green') },
      },
    },
  },
};