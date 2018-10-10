import { getBucketRef } from "../../cloud-storage";

const bucketName = process.env.GOOGLE_HTML_TEMP_BUCKET;
const bucket = getBucketRef(bucketName);

/**
 * Make the bucket and its contents private
 */
bucket.makePrivate({ includeFiles: true }, (err) => {});

