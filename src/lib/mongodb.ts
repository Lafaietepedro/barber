import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
export const MONGODB_DB = process.env.MONGODB_DB || 'barber';

if (!process.env.MONGODB_URI) {
  console.warn('Warning: MONGODB_URI not set, using localhost');
}
if (!process.env.MONGODB_DB) {
  console.warn('Warning: MONGODB_DB not set, using "barber"');
}
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect()
      .catch((err) => {
        // Allow retry on next request after a failed initial connection.
        global._mongoClientPromise = undefined;
        console.error('Failed to connect to MongoDB:', err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      throw err;
    });
}

export default clientPromise;
