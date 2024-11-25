// Initialize tau-prolog required globals
const initPrologGlobals = () => {
  if (typeof window !== 'undefined') {
    (window as any).tau_file_system = {
      get_file_system: () => ({
        get: () => '',
        put: () => false,
        exists: () => false,
        directory: () => false,
        absolute: (x: string) => x
      })
    };

    (window as any).tau_user_input = {
      get: (_success: Function, _error: Function) => {},
      put: (_text: string, _success: Function, _error: Function) => {}
    };
  }
};

// Initialize globals before importing tau-prolog
initPrologGlobals();

// Import tau-prolog modules
import pl from 'tau-prolog';

// Initialize the Prolog engine
let prologInstance: any = null;

try {
  prologInstance = pl;
  console.log('Tau-prolog initialized successfully');
} catch (error) {
  console.error('Failed to initialize tau-prolog:', error);
}

export const getPrologInstance = () => prologInstance;

export const isPrologReady = () => {
  return new Promise((resolve, reject) => {
    if (prologInstance) {
      resolve(prologInstance);
    } else {
      reject(new Error('Prolog instance not initialized'));
    }
  });
};