import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import { MongoClient } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Parse .env.local
const envPath = path.join(rootDir, ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, "");
      process.env[key] = val;
    }
  }
}

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const mongoUri = process.env.MONGODB_URI;

if (!cloudName || !apiKey || !apiSecret) {
  console.error("Missing Cloudinary environment variables in .env.local");
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

console.log(`Cloudinary configured for: ${cloudName}`);

const imagesDir = path.join(rootDir, "public", "images", "gallery");
const files = [
  {
    id: "education-support",
    filename: "Education Support.jpeg",
    title: "Education Support",
  },
  {
    id: "healthcare-wellbeing",
    filename: "Healthcare & Wellbeing.jpeg",
    title: "Healthcare & Wellbeing",
  },
  {
    id: "food-essential-assistance",
    filename: "Food & Essential Assistance.jpeg",
    title: "Food & Essential Assistance",
  },
  {
    id: "childrens-welfare",
    filename: "Children's Welfare.jpeg",
    title: "Children's Welfare",
  },
  {
    id: "community-development",
    filename: "Community Development.jpeg",
    title: "Community Development",
  },
  {
    id: "livelihood-skills",
    filename: "Livelihood & Skills Development.jpeg",
    title: "Livelihood & Skills Development",
  },
  {
    id: "emergency-disaster-relief",
    filename: "Emergency & Disaster Relief.jpeg",
    title: "Emergency & Disaster Relief",
  },
];

async function run() {
  const uploadMap = {};

  for (const item of files) {
    const filePath = path.join(imagesDir, item.filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    console.log(`Uploading ${item.filename} to Cloudinary...`);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "share-community/gallery",
        public_id: item.id,
        overwrite: true,
        resource_type: "image",
      });

      console.log(`✓ Uploaded ${item.title}: ${result.secure_url} (${result.width}x${result.height})`);
      uploadMap[item.id] = {
        url: result.secure_url,
        width: result.width,
        height: result.height,
        publicId: result.public_id,
      };
    } catch (err) {
      console.error(`Failed to upload ${item.filename}:`, err);
    }
  }

  console.log("\nFinished Cloudinary Uploads. Total:", Object.keys(uploadMap).length);

  // If MongoDB URI is available, update or inspect MongoDB gallery collection
  if (mongoUri) {
    console.log("\nConnecting to MongoDB...");
    const client = new MongoClient(mongoUri);
    try {
      await client.connect();
      const db = client.db("share-community");
      const collection = db.collection("gallery");

      const existingDocs = await collection.find({}).toArray();
      console.log(`Found ${existingDocs.length} documents in MongoDB gallery collection:`);
      for (const doc of existingDocs) {
        console.log(`- ID: ${doc.id || doc._id}, Title: "${doc.title}", Src: "${doc.src}"`);
      }

      // Update the 7 existing gallery docs with Cloudinary URLs
      for (const [id, data] of Object.entries(uploadMap)) {
        const updateRes = await collection.updateOne(
          { $or: [{ id: id }, { title: files.find((f) => f.id === id)?.title }] },
          {
            $set: {
              src: data.url,
              width: data.width,
              height: data.height,
              updatedAt: new Date(),
            },
          }
        );
        console.log(`Updated MongoDB doc for ${id}: matched ${updateRes.matchedCount}, modified ${updateRes.modifiedCount}`);
      }

      // Check if there are any broken testing images
      const testingDocs = existingDocs.filter(d => d.title === "testing" || d.title === "Healthcare" && d.caption === "testing");
      if (testingDocs.length > 0) {
        console.log(`Found ${testingDocs.length} testing doc(s):`, JSON.stringify(testingDocs));
      }

    } catch (dbErr) {
      console.error("MongoDB update error:", dbErr);
    } finally {
      await client.close();
    }
  }

  // Write mapping to json for data/gallery.ts update
  fs.writeFileSync(
    path.join(__dirname, "cloudinary-mapping.json"),
    JSON.stringify(uploadMap, null, 2)
  );
  console.log("Saved mapping to scripts/cloudinary-mapping.json");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
