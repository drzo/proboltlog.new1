import { getPrologInstance } from './prologInit';

export interface QueryResult {
  solutions: string[];
  error?: string;
}

export async function runPrologQuery(program: string, query: string): Promise<QueryResult> {
  try {
    const pl = getPrologInstance();
    if (!pl) {
      throw new Error('Prolog instance not initialized');
    }
    
    return new Promise((resolve) => {
      const session = pl.create();
      const result: QueryResult = { solutions: [] };
      
      session.consult(program, {
        success: () => {
          session.query(query, {
            success: () => {
              function getAnswers() {
                session.answer({
                  success: (answer: any) => {
                    result.solutions.push(session.format_answer(answer));
                    getAnswers();
                  },
                  fail: () => {
                    resolve(result);
                  },
                  error: (err: any) => {
                    result.error = `Runtime error: ${err}`;
                    resolve(result);
                  },
                  limit: () => {
                    result.error = 'Query limit exceeded';
                    resolve(result);
                  }
                });
              }
              getAnswers();
            },
            error: (err: any) => {
              result.error = `Query error: ${err}`;
              resolve(result);
            }
          });
        },
        error: (err: any) => {
          result.error = `Program error: ${err}`;
          resolve(result);
        }
      });
    });
  } catch (error) {
    return {
      solutions: [],
      error: `Failed to initialize Prolog: ${error}`
    };
  }
}