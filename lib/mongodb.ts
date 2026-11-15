import { MongoClient, Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const options = {
  maxPoolSize: 10,
};

let cachedClientPromise: Promise<MongoClient> | null = null;

export function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!cachedClientPromise) {
    const client = new MongoClient(uri, options);
    cachedClientPromise = client.connect();
  }

  return cachedClientPromise;
}

export async function getDatabase(dbName?: string): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}

// Collection Types
export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: "new" | "read" | "responded" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export interface VolunteerSubmission {
  name: string;
  email: string;
  phone: string;
  skills: string;
  message: string;
  status: "new" | "reviewed" | "contacted" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export interface PartnerSubmission {
  organisation: string;
  contactName: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "reviewed" | "in_discussion" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryDocument {
  id: string;
  title: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  category: string;
  programmeId?: string;
  createdAt: Date;
  updatedAt: Date;
}
