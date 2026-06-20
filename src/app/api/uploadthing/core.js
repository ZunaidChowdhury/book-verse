import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  profileImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      // This code runs on your server before upload
      return {};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata);
      console.log("file url", file.url);
      return { uploadedBy: "Server", url: file.url };
    }),

  bookCover: f({
    image: { maxFileSize: "5MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      // This code runs on your server before upload
      return {};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Book cover upload complete:", metadata);
      console.log("file url", file.url);
      return { uploadedBy: "Server", url: file.url };
    }),
};
