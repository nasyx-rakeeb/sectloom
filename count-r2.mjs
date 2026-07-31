import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://299be2ee234d9ec5c613c538e6571712.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "9a1b775b1d29fbf6d685a25d4a067b96",
    secretAccessKey: "063c3f626db480f5d3005f0a0f0c9af57c2fee78218358f0f10aee3f857ad895",
  },
});

async function run() {
  let count = 0;
  let isTruncated = true;
  let continuationToken;

  while (isTruncated) {
    const data = await s3.send(new ListObjectsV2Command({
      Bucket: "sectloom-registry",
      ContinuationToken: continuationToken,
    }));
    count += data.Contents ? data.Contents.length : 0;
    isTruncated = data.IsTruncated;
    continuationToken = data.NextContinuationToken;
  }
  console.log(`Total images in R2 bucket: ${count}`);
}

run().catch(console.error);
