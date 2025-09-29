export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface Transaction {
  id: string;
  reference: string;
  recipientId: string;
  recipient: User;
  amount: number;
  date: Date;
  type: 'sent' | 'received';
  notes?: string;
}

export interface WalletState {
  currentUser: User | null;
  balance: number;
  frequentContacts: User[];
  transactions: Transaction[];
  setCurrentUser: (user: User) => void;
  setBalance: (balance: number) => void;
  addTransaction: (transaction: Transaction) => void;
  setFrequentContacts: (contacts: User[]) => void;
  updateBalance: (amount: number) => void;
}

export interface RandomUserResponse {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}