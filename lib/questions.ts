export interface Question {
  id: string;
  question: {
    en: string;
    es: string;
  };
  options: {
    en: string[];
    es: string[];
  };
  correctAnswer: number;
  explanation: {
    en: string;
    es: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
}

export const questions: Question[] = [
  {
    id: '1',
    question: {
      en: 'What is a blockchain?',
      es: '¿Qué es una blockchain?'
    },
    options: {
      en: ['A decentralized chain of blocks', 'A central bank', 'A video game', 'A social network'],
      es: ['Una cadena de bloques descentralizada', 'Un banco central', 'Un videojuego', 'Una red social']
    },
    correctAnswer: 0,
    explanation: {
      en: 'A blockchain is a distributed ledger that maintains a continuously growing list of records.',
      es: 'Una blockchain es un libro contable distribuido que mantiene una lista de registros en crecimiento continuo.'
    },
    difficulty: 'easy'
  },
  {
    id: '2',
    question: {
      en: 'What does NFT stand for?',
      es: '¿Qué significa NFT?'
    },
    options: {
      en: ['Non-Fungible Token', 'New Financial Tool', 'Network File Transfer', 'Nano Fiber Tech'],
      es: ['Non-Fungible Token', 'Nueva Herramienta Financiera', 'Transferencia de Archivos de Red', 'Tecnología de Nanofibra']
    },
    correctAnswer: 0,
    explanation: {
      en: 'NFT stands for Non-Fungible Token, representing unique digital assets on blockchain.',
      es: 'NFT significa Non-Fungible Token, representando activos digitales únicos en blockchain.'
    },
    difficulty: 'easy'
  },
  {
    id: '3',
    question: {
      en: 'What is a smart contract?',
      es: '¿Qué es un contrato inteligente?'
    },
    options: {
      en: ['Self-executing contract with code', 'A legal document', 'An insurance policy', 'A mobile app'],
      es: ['Contrato autoejecutado con código', 'Un documento legal', 'Una póliza de seguro', 'Una aplicación móvil']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Smart contracts are self-executing contracts with terms directly written into code.',
      es: 'Los contratos inteligentes son contratos autoejecutados con términos escritos directamente en código.'
    },
    difficulty: 'medium'
  },
  {
    id: '4',
    question: {
      en: 'What does DAO stand for?',
      es: '¿Qué significa DAO?'
    },
    options: {
      en: ['Decentralized Autonomous Organization', 'Digital Asset Operation', 'Distributed Application Oracle', 'Dynamic Algorithm Optimizer'],
      es: ['Organización Autónoma Descentralizada', 'Operación de Activos Digitales', 'Oráculo de Aplicación Distribuida', 'Optimizador de Algoritmo Dinámico']
    },
    correctAnswer: 0,
    explanation: {
      en: 'DAO stands for Decentralized Autonomous Organization, governed by smart contracts.',
      es: 'DAO significa Organización Autónoma Descentralizada, gobernada por contratos inteligentes.'
    },
    difficulty: 'medium'
  },
  {
    id: '5',
    question: {
      en: 'Which blockchain does Ethereum use for consensus?',
      es: '¿Qué blockchain usa Ethereum para el consenso?'
    },
    options: {
      en: ['Proof of Stake', 'Proof of Work', 'Proof of Authority', 'Proof of History'],
      es: ['Prueba de Participación', 'Prueba de Trabajo', 'Prueba de Autoridad', 'Prueba de Historia']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Ethereum transitioned to Proof of Stake consensus mechanism in 2022.',
      es: 'Ethereum hizo la transición al mecanismo de consenso Proof of Stake en 2022.'
    },
    difficulty: 'medium'
  },
  {
    id: '6',
    question: {
      en: 'What is Web3?',
      es: '¿Qué es Web3?'
    },
    options: {
      en: ['Decentralized internet', 'Third version of Windows', 'New social media platform', 'Programming language'],
      es: ['Internet descentralizada', 'Tercera versión de Windows', 'Nueva plataforma de redes sociales', 'Lenguaje de programación']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Web3 represents a decentralized internet built on blockchain technology.',
      es: 'Web3 representa una internet descentralizada construida sobre tecnología blockchain.'
    },
    difficulty: 'easy'
  },
  {
    id: '7',
    question: {
      en: 'What is a crypto wallet?',
      es: '¿Qué es una billetera cripto?'
    },
    options: {
      en: ['Digital tool to store crypto keys', 'Physical wallet for coins', 'Bank account', 'Credit card'],
      es: ['Herramienta digital para almacenar claves cripto', 'Billetera física para monedas', 'Cuenta bancaria', 'Tarjeta de crédito']
    },
    correctAnswer: 0,
    explanation: {
      en: 'A crypto wallet stores private keys that allow access to cryptocurrency.',
      es: 'Una billetera cripto almacena claves privadas que permiten acceso a criptomonedas.'
    },
    difficulty: 'easy'
  },
  {
    id: '8',
    question: {
      en: 'What is DeFi?',
      es: '¿Qué es DeFi?'
    },
    options: {
      en: ['Decentralized Finance', 'Digital Finance', 'Derivative Finance', 'Defined Finance'],
      es: ['Finanzas Descentralizadas', 'Finanzas Digitales', 'Finanzas Derivadas', 'Finanzas Definidas']
    },
    correctAnswer: 0,
    explanation: {
      en: 'DeFi stands for Decentralized Finance, financial services on blockchain.',
      es: 'DeFi significa Finanzas Descentralizadas, servicios financieros en blockchain.'
    },
    difficulty: 'medium'
  },
  {
    id: '9',
    question: {
      en: 'What is gas in Ethereum?',
      es: '¿Qué es el gas en Ethereum?'
    },
    options: {
      en: ['Transaction fee', 'Fuel for cars', 'Storage space', 'Programming language'],
      es: ['Tarifa de transacción', 'Combustible para autos', 'Espacio de almacenamiento', 'Lenguaje de programación']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Gas is the fee required to execute transactions on the Ethereum network.',
      es: 'El gas es la tarifa requerida para ejecutar transacciones en la red Ethereum.'
    },
    difficulty: 'medium'
  },
  {
    id: '10',
    question: {
      en: 'What is a dApp?',
      es: '¿Qué es una dApp?'
    },
    options: {
      en: ['Decentralized Application', 'Desktop Application', 'Data Application', 'Dynamic Application'],
      es: ['Aplicación Descentralizada', 'Aplicación de Escritorio', 'Aplicación de Datos', 'Aplicación Dinámica']
    },
    correctAnswer: 0,
    explanation: {
      en: 'A dApp is a decentralized application running on blockchain network.',
      es: 'Una dApp es una aplicación descentralizada que funciona en red blockchain.'
    },
    difficulty: 'easy'
  },
  {
    id: '11',
    question: {
      en: 'What is yield farming?',
      es: '¿Qué es el yield farming?'
    },
    options: {
      en: ['Earning rewards by providing liquidity', 'Growing crops digitally', 'Mining cryptocurrency', 'Trading stocks'],
      es: ['Ganar recompensas proporcionando liquidez', 'Cultivar digitalmente', 'Minar criptomonedas', 'Intercambiar acciones']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Yield farming involves earning rewards by providing liquidity to DeFi protocols.',
      es: 'El yield farming involucra ganar recompensas proporcionando liquidez a protocolos DeFi.'
    },
    difficulty: 'hard'
  },
  {
    id: '12',
    question: {
      en: 'What is a DEX?',
      es: '¿Qué es un DEX?'
    },
    options: {
      en: ['Decentralized Exchange', 'Digital Exchange', 'Data Exchange', 'Dynamic Exchange'],
      es: ['Intercambio Descentralizado', 'Intercambio Digital', 'Intercambio de Datos', 'Intercambio Dinámico']
    },
    correctAnswer: 0,
    explanation: {
      en: 'A DEX is a decentralized exchange for trading cryptocurrencies without intermediaries.',
      es: 'Un DEX es un intercambio descentralizado para comerciar criptomonedas sin intermediarios.'
    },
    difficulty: 'medium'
  },
  {
    id: '13',
    question: {
      en: 'What is staking in crypto?',
      es: '¿Qué es el staking en cripto?'
    },
    options: {
      en: ['Locking tokens to earn rewards', 'Buying and selling quickly', 'Creating new coins', 'Storing in hardware wallet'],
      es: ['Bloquear tokens para ganar recompensas', 'Comprar y vender rápidamente', 'Crear nuevas monedas', 'Almacenar en billetera física']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Staking involves locking up cryptocurrency to support network operations and earn rewards.',
      es: 'El staking involucra bloquear criptomonedas para apoyar operaciones de red y ganar recompensas.'
    },
    difficulty: 'easy'
  },
  {
    id: '14',
    question: {
      en: 'What is a governance token?',
      es: '¿Qué es un token de gobernanza?'
    },
    options: {
      en: ['Token for voting on protocol decisions', 'Government-issued currency', 'Tax payment token', 'Identity verification token'],
      es: ['Token para votar en decisiones del protocolo', 'Moneda emitida por gobierno', 'Token de pago de impuestos', 'Token de verificación de identidad']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Governance tokens allow holders to vote on important protocol decisions and proposals.',
      es: 'Los tokens de gobernanza permiten a los tenedores votar en decisiones y propuestas importantes del protocolo.'
    },
    difficulty: 'medium'
  },
  {
    id: '15',
    question: {
      en: 'What is Layer 2 in blockchain?',
      es: '¿Qué es Layer 2 en blockchain?'
    },
    options: {
      en: ['Scaling solution on top of main chain', 'Second blockchain network', 'Security protocol', 'Mining algorithm'],
      es: ['Solución de escalabilidad sobre cadena principal', 'Segunda red blockchain', 'Protocolo de seguridad', 'Algoritmo de minería']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Layer 2 solutions improve scalability by processing transactions off the main blockchain.',
      es: 'Las soluciones Layer 2 mejoran la escalabilidad procesando transacciones fuera de la blockchain principal.'
    },
    difficulty: 'hard'
  },
  {
    id: '16',
    question: {
      en: 'What is a bridge in crypto?',
      es: '¿Qué es un puente en cripto?'
    },
    options: {
      en: ['Protocol connecting different blockchains', 'Physical structure', 'Trading strategy', 'Security measure'],
      es: ['Protocolo que conecta diferentes blockchains', 'Estructura física', 'Estrategia de trading', 'Medida de seguridad']
    },
    correctAnswer: 0,
    explanation: {
      en: 'A bridge allows assets and data to move between different blockchain networks.',
      es: 'Un puente permite que activos y datos se muevan entre diferentes redes blockchain.'
    },
    difficulty: 'medium'
  },
  {
    id: '17',
    question: {
      en: 'What is impermanent loss?',
      es: '¿Qué es la pérdida impermanente?'
    },
    options: {
      en: ['Temporary loss from liquidity providing', 'Permanent wallet damage', 'Failed transaction', 'Network downtime'],
      es: ['Pérdida temporal por proporcionar liquidez', 'Daño permanente de billetera', 'Transacción fallida', 'Tiempo de inactividad de red']
    },
    correctAnswer: 0,
    explanation: {
      en: 'Impermanent loss occurs when providing liquidity and token prices change relative to each other.',
      es: 'La pérdida impermanente ocurre al proporcionar liquidez y los precios de tokens cambian relativamente.'
    },
    difficulty: 'hard'
  },
  {
    id: '18',
    question: {
      en: 'What is HODL?',
      es: '¿Qué es HODL?'
    },
    options: {
      en: ['Hold crypto long-term', 'High-frequency trading', 'Hardware wallet brand', 'Blockchain protocol'],
      es: ['Mantener cripto a largo plazo', 'Trading de alta frecuencia', 'Marca de billetera física', 'Protocolo blockchain']
    },
    correctAnswer: 0,
    explanation: {
      en: 'HODL means holding cryptocurrency for the long term instead of trading frequently.',
      es: 'HODL significa mantener criptomonedas a largo plazo en lugar de comerciar frecuentemente.'
    },
    difficulty: 'easy'
  },
  {
    id: '19',
    question: {
      en: 'What is a whitepaper in crypto?',
      es: '¿Qué es un whitepaper en cripto?'
    },
    options: {
      en: ['Technical document explaining project', 'Legal contract', 'Marketing brochure', 'User manual'],
      es: ['Documento técnico explicando proyecto', 'Contrato legal', 'Folleto de marketing', 'Manual de usuario']
    },
    correctAnswer: 0,
    explanation: {
      en: 'A whitepaper is a technical document that explains a cryptocurrency project\'s purpose and mechanics.',
      es: 'Un whitepaper es un documento técnico que explica el propósito y mecánica de un proyecto de criptomonedas.'
    },
    difficulty: 'easy'
  },
  {
    id: '20',
    question: {
      en: 'What is a multisig wallet?',
      es: '¿Qué es una billetera multisig?'
    },
    options: {
      en: ['Wallet requiring multiple signatures', 'Wallet with multiple currencies', 'Multiple physical wallets', 'Wallet with multiple accounts'],
      es: ['Billetera que requiere múltiples firmas', 'Billetera con múltiples monedas', 'Múltiples billeteras físicas', 'Billetera con múltiples cuentas']
    },
    correctAnswer: 0,
    explanation: {
      en: 'A multisig wallet requires multiple private key signatures to authorize transactions.',
      es: 'Una billetera multisig requiere múltiples firmas de clave privada para autorizar transacciones.'
    },
    difficulty: 'medium'
  }
];

export function getRandomQuestions(count: number = 5): Question[] {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, questions.length));
}

export function getQuestionById(id: string): Question | undefined {
  return questions.find(q => q.id === id);
}