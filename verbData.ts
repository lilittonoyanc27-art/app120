export interface MatchingPair {
  id: string;
  original: string;
  translation: string;
}

export interface SentenceChallenge {
  id: string;
  sentence: string; 
  answer: string;
  translation: string;
  options: string[];
}

export interface DictionaryItem {
  phrase: string;
  category: 'persona' | 'cosa' | 'tiempo' | 'cantidad';
  translation: string;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  type: 'matching' | 'test' | 'theory';
  status: 'locked' | 'available' | 'completed';
}

export const MYSTERY_DATA = {
  levels: [
    { id: '1', title: 'Բառերի Մեթչինգ', description: 'Համապատասխանեցրու թարգմանությունները', type: 'matching', status: 'available' },
    { id: '2', title: 'Խորհրդավոր Թեստ', description: 'Լրացրու 15 գաղտնի նախադասություն', type: 'test', status: 'available' },
    { id: '3', title: 'Գաղտնի Թեորիա', description: 'Սովորիր Algo, Nada և մյուսները', type: 'theory', status: 'available' },
  ] as Level[],
  
  dictionary: [
    { phrase: 'Alguien', category: 'persona', translation: 'Ինչ-որ մեկը' },
    { phrase: 'Nadie', category: 'persona', translation: 'Ոչ ոք' },
    { phrase: 'Algo', category: 'cosa', translation: 'Ինչ-որ բան' },
    { phrase: 'Nada', category: 'cosa', translation: 'Ոչինչ' },
    { phrase: 'Siempre', category: 'tiempo', translation: 'Միշտ' },
    { phrase: 'Nunca', category: 'tiempo', translation: 'Երբեք' },
    { phrase: 'Tampoco', category: 'tiempo', translation: 'Նույնպես ոչ' },
    { phrase: 'También', category: 'tiempo', translation: 'Նույնպես' },
    { phrase: 'Alguno', category: 'cantidad', translation: 'Որևէ մեկը' },
    { phrase: 'Ninguno', category: 'cantidad', translation: 'Ոչ մեկը' },
  ] as DictionaryItem[],

  matching: [
    { id: 'm1', original: 'Alguien', translation: 'Ինչ-որ մեկը' },
    { id: 'm2', original: 'Algo', translation: 'Ինչ-որ բան' },
    { id: 'm3', original: 'Siempre', translation: 'Միշտ' },
    { id: 'm4', original: 'También', translation: 'Նույնպես' },
    { id: 'm5', original: 'Alguno', translation: 'Որևէ մեկը' },
    { id: 'm6', original: 'Nadie', translation: 'Ոչ ոք' },
    { id: 'm7', original: 'Nada', translation: 'Ոչինչ' },
    { id: 'm8', original: 'Nunca', translation: 'Երբեք' },
    { id: 'm9', original: 'Tampoco', translation: 'Նույնպես ոչ' },
    { id: 'm10', original: 'Ninguno', translation: 'Ոչ մեկը' },
  ] as MatchingPair[],

  sentences: [
    { id: 's1', sentence: 'No hay ___ (nothing) en la caja.', answer: 'nada', translation: 'Տուփի մեջ ոչինչ չկա:', options: ['nada', 'algo', 'ninguno', 'nadie'] },
    { id: 's2', sentence: '¿Hay ___ (someone) en casa?', answer: 'alguien', translation: 'Տանը ինչ-որ մեկը կա՞:', options: ['alguien', 'nadie', 'algo', 'nada'] },
    { id: 's3', sentence: '___ (nobody) sabe la verdad.', answer: 'Nadie', translation: 'Ոչ ոք չգիտի ճշմարտությունը:', options: ['Nadie', 'Alguien', 'Nada', 'Algo'] },
    { id: 's4', sentence: 'Yo ___ (never) miento.', answer: 'nunca', translation: 'Ես երբեք չեմ ստում:', options: ['nunca', 'siempre', 'tampoco', 'nada'] },
    { id: 's5', sentence: '¿Tienes ___ (something) para mí?', answer: 'algo', translation: 'Ինձ համար ինչ-որ բա՞ն ունես:', options: ['algo', 'nada', 'alguien', 'nadie'] },
    { id: 's6', sentence: 'No tengo ___ (none) amigo aquí.', answer: 'ningún', translation: 'Այստեղ ոչ մի ընկեր չունեմ:', options: ['ningún', 'alguno', 'nada', 'nadie'] },
    { id: 's7', sentence: 'Ella ___ (always) llega tarde.', answer: 'siempre', translation: 'Նա միշտ ուշանում է:', options: ['siempre', 'nunca', 'tampoco', 'algo'] },
    { id: 's8', sentence: 'A mí no me gusta el cine, a él ___ (neither).', answer: 'tampoco', translation: 'Ես կինո չեմ սիրում, նա նույնպես:', options: ['tampoco', 'también', 'nada', 'nunca'] },
    { id: 's9', sentence: '¿Hay ___ (any) libro interesante?', answer: 'algún', translation: 'Որևէ հետաքրքիր գիրք կա՞:', options: ['algún', 'ningún', 'algo', 'alguien'] },
    { id: 's10', sentence: 'No veo a ___ (anyone) en la calle.', answer: 'nadie', translation: 'Փողոցում ոչ ոքի չեմ տեսնում:', options: ['nadie', 'alguien', 'nada', 'algo'] },
    { id: 's11', sentence: '¿Quieres comer ___ (something)?', answer: 'algo', translation: 'Ուզո՞ւմ ես ինչ-որ բան ուտել:', options: ['algo', 'nada', 'alguien', 'alguno'] },
    { id: 's12', sentence: '___ (no) de los estudiantes vino.', answer: 'Ninguno', translation: 'Ուսանողներից ոչ մեկը չեկավ:', options: ['Ninguno', 'Alguno', 'Nadie', 'Nada'] },
    { id: 's13', sentence: 'Él no come carne y yo ___ (neither).', answer: 'tampoco', translation: 'Նա միս չի ուտում, և ես նույնպես:', options: ['tampoco', 'también', 'siempre', 'nunca'] },
    { id: 's14', sentence: '___ (some) día iré a España.', answer: 'Algún', translation: 'Ինչ-որ մի օր կգնամ Իսպանիա:', options: ['Algún', 'Ningún', 'Siempre', 'Nunca'] },
    { id: 's15', sentence: 'No me digas ___ (nothing).', answer: 'nada', translation: 'Ինձ ոչինչ մի ասա:', options: ['nada', 'algo', 'alguien', 'nadie'] },
  ] as SentenceChallenge[]
};
